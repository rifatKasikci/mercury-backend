const router = require('express').Router()
const waitlistUsersController = require('../controllers/waitlistUsersController')
const authMiddleware = require('../middlewares/authMiddleware').requireAuth
const validationMiddleware = require('../middlewares/validationMiddleware').validate
const waitlistUserValidationRules = require('../validationRules/').waitlistUser

router.post('/add', validationMiddleware(waitlistUserValidationRules), waitlistUsersController.add)

module.exports = router