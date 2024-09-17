const { body } = require('express-validator')

module.exports = [
    body('newPassword').notEmpty().isStrongPassword().withMessage('Please enter a strong password!')
]