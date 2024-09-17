const { decodeToken } = require('../core/utils/hashHelper')
const index = require('../models/index.js')
const User = index.users
const  { ErrorResult, SuccessResult} = require('../core/utils/results/results')

const checkUserEmailVerified = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.json(new ErrorResult('Email is not verified!'))
    }
    const userEmail = decodeToken(token.split(' ')[1]).email
    const user = await User.findOne({
        where:{
            email:userEmail
        }
    })   
    const emailVerified = user.emailConfirmed
    if (!emailVerified) {
        res.json(new ErrorResult('Email is not verified!'))
    }else{
        next()
    }
     
}

module.exports = { checkUserEmailVerified }