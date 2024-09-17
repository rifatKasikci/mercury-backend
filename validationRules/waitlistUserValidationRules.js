const { body } = require('express-validator')

module.exports = [
    body('firstName').isString().trim().escape().withMessage('This field must be a string!'),
    body('firstName').notEmpty().withMessage('This field can not be null!'),
    body('firstName').isLength({min:2, max:50}).withMessage('firstName is too short or too long!'),
    body('lastName').isString().trim().escape().withMessage('This field must be a string!'),
    body('lastName').notEmpty().withMessage('This field can not be null!'),
    body('lastName').isLength({min:2, max:50}).withMessage('lastName is too short or too long!'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('This value is not a valid email!'),
    body('email').isString().withMessage('This field must be a string!'),
    body('email').notEmpty().withMessage('This field can not be null!'),
]