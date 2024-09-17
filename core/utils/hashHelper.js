const  bcrypt = require('bcrypt')
const jwtDecode = require('jwt-decode')
const randToken = require('rand-token')

const hashTextWithSalt = (plainText, saltRounds=10) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(plainText, salt)
    return hash
}

const compareHash = (plainText, hashValue) => {
    const result = bcrypt.compareSync(plainText, hashValue)
    return result
}

const generateEmailVerificationCode = async (digits) => {
    var plainCode = Math.floor(Math.random() * ((Math.pow(10, digits+1)-1) - Math.pow(10, digits)) + Math.pow(10, digits)).toString()
    return plainCode
}

const verifyEmailVerificationCode = (inputCode, generatedCode) => {
    return inputCode === generatedCode
}

const decodeToken = (token) => {
    const decodedToken = jwtDecode(token)
    return decodedToken
}

const generateToken = (bytes) => { 
    const token = randToken.generate(bytes)
    return token
}

module.exports = { hashTextWithSalt, compareHash, generateEmailVerificationCode, verifyEmailVerificationCode, decodeToken, generateToken }
