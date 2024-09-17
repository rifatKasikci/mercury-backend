const { body } = require('express-validator')

module.exports = [
    body('messageId').isUUID().trim().escape().withMessage('This field must be a UUID!'),
    body('messageId').notEmpty().withMessage('This field can not be null!'),
    body('advertId').notEmpty().withMessage('This field can not be null!'),
    body('advertId').isInt().withMessage('This field must be an integer!')
]