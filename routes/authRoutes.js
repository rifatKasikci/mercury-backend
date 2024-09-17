const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js')
const validationMiddleware = require('../middlewares/validationMiddleware').validate
const userValidationRules = require('../validationRules/index').user
const { basicInputValidationRules:basicInput, passwordValidationRules:password} = require('../validationRules/index');
const passwordValidationRules = require('../validationRules/passwordValidationRules.js');
router.post('/login', authController.login)
router.post('/register', validationMiddleware(userValidationRules),authController.register)
router.post('/resetToken', authController.resetToken)
router.post('/resetPassword', authController.resetPassword)
router.post('/changePassword/:token', validationMiddleware(passwordValidationRules), authController.changePassword)

module.exports = router
