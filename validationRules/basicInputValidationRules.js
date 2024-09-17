const { body } = require('express-validator')

module.exports = [
    body('refreshToken').isUUID().trim().escape().withMessage('Please enter a valid refresh token!'),
    body('email').isEmpty().isEmail().normalizeEmail().trim().escape().withMessage('Pelase enter a valid email!'),
    body('newPassword').isStrongPassword().withMessage('Please enter a strong password!')
]