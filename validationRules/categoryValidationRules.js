const { body } = require('express-validator')

module.exports = [
    body('name').isString().trim().escape().withMessage('This field must be a string!'),
    body('name').notEmpty().withMessage('This field can not be null!'),
    body('name').isLength({min:2}).withMessage('Category name is too short!')
]
