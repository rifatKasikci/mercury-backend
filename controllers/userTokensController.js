const { generateToken } = require('../core/utils/hashHelper')
const { userTokens:UserToken, users:User  } = require('../models/index')
const RepositoryBase = require('../repositories/repositoryBase')
const mailService = require('../core/mailing/mailService')
const Mail = require('../core/mailing/mail')
const emailTemplate = require('../core/mailing/templates/emailTemplate.js')
const { hashTextWithSalt } = require('../core/utils/hashHelper')
const { AuthError } = require('../core/utils/errors')
require('dotenv').config()

const userTokenRepository = new RepositoryBase(UserToken) 
const userRepository = new RepositoryBase(User)

module.exports.createToken = async (email) => {
    const token = generateToken(100)
    const expirationDate = new Date();
    const user = await userRepository.getOneFiltered({email:email})
    if (!user) {
        throw new AuthError('User not found!')
    }
    expirationDate.setSeconds(expirationDate.getSeconds() + 86400);
    const addedUserToken = userTokenRepository.add({
        token:token,
        userId:user.id,
        active:false,
        expirationDate:expirationDate
    })
    const passwordResetLink = `<a href='${process.env.PASSWORD_RESET_BASE_URL + "/" + token}'>Reset Password</a>`
    const mail = new Mail(email, 'Password Reset', emailTemplate.passwordResetTemplate(passwordResetLink, user.userName, user.firstName))
    await mailService.sendMail(mail)
    return addedUserToken
} 

module.exports.verifyUserToken = async (token, newPassword) => {
    const userToken = await userTokenRepository.getOneFiltered({token:token, active:false})
    if (!userToken) {
        throw new AuthError('Token not found!')
    }
    const isExpired = userToken.expirationDate.getTime() < new Date().getTime();
    if (isExpired) {
        await userTokenRepository.delete(userToken.id)
        throw new AuthError('Refresh token is expired. Please login again!')
    }else{
        const user = await userRepository.getOneFiltered({id:userToken.userId})
        user.passwordHash = hashTextWithSalt(newPassword,10)
        user.save()
        userToken.active = true
        userToken.save()
        return userToken
    }
}
