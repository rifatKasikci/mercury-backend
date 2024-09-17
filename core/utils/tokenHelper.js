const jwt = require('jsonwebtoken')
const hashHelper = require('./hashHelper.js')
const { AuthError } = require('./errors')
require('dotenv').config()

const createToken = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_EXP_TIME})  
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn:process.env.TOKEN_EXP_TIME })
}

const checkUser = (user,password) => {
    const result = hashHelper.compareHash(password, user.passwordHash)
    return result
}

const verifyToken = (token) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            console.log(err.message)
            throw new AuthError(err.message)
        }else {
            return true
        }
    })
    return true
}

module.exports = { createToken, checkUser, createRefreshToken, verifyToken }
