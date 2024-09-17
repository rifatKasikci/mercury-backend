const VerificationCode = require('../models/index.js').verificationCodes
const hashHelper = require('../core/utils/hashHelper')
const mailService = require('../core/mailing/mailService')
const Mail = require('../core/mailing/mail')
const User = require('../models/index.js').users
const emailTemplate = require('../core/mailing/templates/emailTemplate.js')
const jwtDecode = require('jwt-decode')
const { SuccessResult, SuccessDataResult, ErrorDataResult, ErrorResult } = require('../core/utils/results/results')
const RepositoryBase = require('../repositories/repositoryBase')
const { AuthError } = require('../core/utils/errors')

const VerificationCodesRepository = new RepositoryBase(VerificationCode)
const UserRepository = new RepositoryBase(User)

const checkUserCodes = async (userId) => {
    const code = await VerificationCodesRepository.getOneFiltered({
            userId:userId,
            isVerified:false
        })
    if(!code){
        return null
    }else{
        return code
    }
}

module.exports.add = async (userId) => {
    const generatedCode = await hashHelper.generateEmailVerificationCode(5)
    const deadline = new Date()
    deadline.setHours(deadline.getHours()+1)
    const code = { code: generatedCode, isVerified: false, codeDeadline: deadline, userId: userId }
    const addedCode = await VerificationCodesRepository.add(code)
    const user = await UserRepository.getOneFiltered({ id: userId });
    const mail = new Mail(user.email, 'Email Verification', emailTemplate.emailConfirmationTemplate(generatedCode,user.userName))
    await mailService.sendMail(mail)
    return true
}

module.exports.verify = async (req, res) => {
    const userId = hashHelper.decodeToken(req.headers.authorization.split(' ')[1]).id
    const codeInput = req.params['code']
    const code = await checkUserCodes(userId)
    const now = new Date()
    if (code.codeDeadline.getTime() < now.getTime()) {
        throw new AuthError('Verification code has expired!')
    }
    const user = await UserRepository.getOneFiltered({ id:userId })
    if (code === null) {
        throw new AuthError('There is no code has sent!')
    }
    const success = hashHelper.verifyEmailVerificationCode(codeInput, code.code)
    const newCode = code
    newCode.isVerified = true
    user.emailConfirmed = true
    if (success) {
        await newCode.save()
        await user.save()
        return res.json(new SuccessResult('Code verified!'))
    }else{
        throw new AuthError('You entered the wrong code!')
    }
}
