const router = require('express').Router()
const tradeProductsController = require('../controllers/tradeProductsController')
const authMiddleware = require('../middlewares/authMiddleware').requireAuth
const validationMiddleware = require('../middlewares/validationMiddleware').validate
const tradeProductValidationRules = require('../validationRules/tradeProductValidationRules')
const emailCheckMiddleware = require('../middlewares/emailCheckMiddleware').checkUserEmailVerified


router.get('/getByAdvertId/:advertId', authMiddleware('User'), emailCheckMiddleware,tradeProductsController.getByAdvertId)
router.post('/add', authMiddleware('User'), emailCheckMiddleware,validationMiddleware(tradeProductValidationRules), tradeProductsController.add)
router.post('/confirmTradeProduct', authMiddleware('User'), emailCheckMiddleware,tradeProductsController.confirmTradeProduct)
router.post('/declineTradeProduct', authMiddleware('User'), emailCheckMiddleware,tradeProductsController.declineTradeProduct)


module.exports = router