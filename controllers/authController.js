const index = require('../models/index.js')
const User = index.users
const Role = index.roles
const hashHelper = require('../core/utils/hashHelper.js')
const { checkUser, createToken, verifyToken } = require('../core/utils/tokenHelper')
const verificationCodesController = require('./verificationCodesController.js')
const RepositoryBase = require('../repositories/repositoryBase')
const { SuccessResult, SuccessDataResult, ErrorDataResult, ErrorResult } = require('../core/utils/results/results')
const { AuthError } = require('../core/utils/errors')
const RoleRepository = new RepositoryBase(Role)
const UserRepository = new RepositoryBase(User)
const { createRefreshToken, verifyRefreshToken } = require('./refreshTokenController')
const userTokensController = require('../controllers/userTokensController')


const createIfRoleNotExist = async (roleName, user) => {
    const role = await RoleRepository.getFiltered({ name: roleName })
    const isEmpty = Object.keys(role).length === 0
    if (isEmpty === true) {
        const addedRole = await RoleRepository.add({
            name: roleName
        })
        await user.addRole(addedRole)
        return true
    }
    await user.addRole(role)
    return true
}

const checkUserExists = async (userForRegister) => {
    let user = await UserRepository.getFiltered({ email: userForRegister.email })
    let isEmpty = Object.keys(user).length === 0
    if (!isEmpty) {
        throw new AuthError('This user is already exists!')
    }
    user = await UserRepository.getFiltered({userName: userForRegister.userName})
    isEmpty = Object.keys(user).length === 0
    if (!isEmpty) {
        throw new AuthError('This user is already exists!')
    }
}

module.exports.register = async (req, res) => {
    const body = req.body
    await checkUserExists(body)
    body.passwordHash = hashHelper.hashTextWithSalt(body.password, 10)
    body.emailConfirmed = false
    const addedUser = await UserRepository.add(body)
    await verificationCodesController.add(addedUser.id)
    await createIfRoleNotExist('User', addedUser)
    const responseData = {
        token: createToken({ id: addedUser.id, email: addedUser.email }),
        refreshToken: await createRefreshToken(addedUser.id)
    }
    res.status(200).json(new SuccessDataResult('User registered!', responseData))
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await UserRepository.getOneFiltered({ email: email })
    if (user) {
        if (checkUser(user, password)) {
            const responseData = {
                token: createToken({ id: user.id, email: user.email }),
                refreshToken: await createRefreshToken(user.id)
            }
            return res.status(200).json(new SuccessDataResult('Login successfull!', responseData))
        } else {
            return res.status(401).json(new ErrorResult('Your login information is wrong!'))
        }
    } else {
        res.status(401).json(new ErrorResult('User not found!'))
    }
}

module.exports.resetToken = async (req, res) => {
    const { refreshToken } = req.body
    const token = await verifyRefreshToken(refreshToken)
    const user = await UserRepository.getOneFiltered({id:token.userId})
    const responseData = { 
        token: createToken({id:token.userId, email:user.email}) 
    }
    if (token) {
        res.json(new SuccessDataResult('Token refreshed!', responseData))
    }else{
        res.json('Token could not provided!')
    }
}

module.exports.resetPassword = async (req, res) => {
    const { email } = req.body
    await userTokensController.createToken(email)
    res.json(new SuccessResult('Password reset email has sent!'))
}

module.exports.changePassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body
    await userTokensController.verifyUserToken(token, newPassword)
    res.json(new SuccessResult('Password changed!'))
}
