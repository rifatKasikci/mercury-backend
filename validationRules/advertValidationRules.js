const { body } = require('express-validator')

module.exports = [
    body('completionTimeOfRequestedService').notEmpty().trim().escape().withMessage('This field can not be null!'),
    body('completionTimeOfRequestedService').isInt().withMessage('This field must be a integer!'),
    body('completionTimeOfProvidedService').notEmpty().trim().escape().withMessage('This field can not be null!'),
    body('completionTimeOfProvidedService').isInt().withMessage('This field must be a integer!'),
    body('minRevisionCount').isInt().trim().escape().withMessage('This field must be a integer!'),
    body('minRevisionCount').notEmpty().withMessage('This field can not be null!'),
    body('minRevisionCount').custom((minRevisionCount, { req })=>{
        if (minRevisionCount>=req.body.maxRevisionCount) {
            return Promise.reject('minRevisionCount can not be greater than maxRevisionCount!')
        }
        return true
    }).withMessage('minRevisionCount can not be greater than maxRevisionCount!'),
    body('maxRevisionCount').notEmpty().trim().escape().withMessage('This field must be a integer!'),
    body('maxRevisionCount').notEmpty().withMessage('This field can not be null!'),
    body('maxRevisionCount').custom((maxRevisionCount, { req })=>{
        if (req.body.minRevisionCount>=maxRevisionCount) {
            return Promise.reject('maxRevisionCount can not be less than minRevisionCount!')
        }
        return true
    }).withMessage('maxRevisionCount can not be less than minRevisionCount!'),
    body('revisionCountOfProvidedService').notEmpty().trim().escape().withMessage('This field can not be null!'),
    body('revisionCountOfProvidedService').isInt().withMessage('This field must be an integer!'),
    body('revisionCountOfRequestedService').notEmpty().trim().escape().withMessage('This field can not be null!'),
    body('revisionCountOfRequestedService').isInt().withMessage('This field must be an integer!') 
]
