const router = require('express').Router()
const verificationCodesController = require('../controllers/verificationCodesController.js')
const authMiddleware = require('../middlewares/authMiddleware').requireAuth

router.post('/:code', verificationCodesController.verify)

module.exports = router
