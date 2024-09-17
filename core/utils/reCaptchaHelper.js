const axios = require('axios')
require('dotenv').config()
const { ReCaptchaError } = require('../utils/errors') 

module.exports.validateReCaptchaToken = async (token) => {
    if (!token) {
        throw new ReCaptchaError('ReCaptcha token is required!')
    }
    let url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    let response = await axios.post(url)
    if (!response.data.success) {
        throw new ReCaptchaError('ReCaptcha token is invalid!')
    }
    return response.data.success
}
