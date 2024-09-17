const router = require('express').Router()
const advertsController = require('../controllers/advertsController')
const authMiddleware = require('../middlewares/authMiddleware').requireAuth
const validationMiddleware = require('../middlewares/validationMiddleware').validate
const emailCheckMiddleware = require('../middlewares/emailCheckMiddleware').checkUserEmailVerified
const advertValidationRules = require('../validationRules/index').advert

router.get('/', authMiddleware('Admin'), emailCheckMiddleware, advertsController.getAll)
router.get('/getByUserId', authMiddleware('User'), emailCheckMiddleware,advertsController.getByUserId)
router.get('/getUsersWaitingTrades', authMiddleware('User'), emailCheckMiddleware,advertsController.getUsersWaitingTrades)
router.get('/getUsersStartedTrades', authMiddleware('User'), emailCheckMiddleware,advertsController.getUsersStartedTrades)
router.get('/getUsersFinishedTrades', authMiddleware('User'), emailCheckMiddleware,advertsController.getUsersFinishedTrades)
router.get('/:id', authMiddleware('Admin'), emailCheckMiddleware,advertsController.getById)
router.post('/getMatchesOrCreateAdvert', authMiddleware('User'), emailCheckMiddleware,validationMiddleware(advertValidationRules), advertsController.getMatchesOrCreateAdvert)
router.post('/confirmMatchedUser', authMiddleware('User'), emailCheckMiddleware,advertsController.confirmMatchedUser)
router.post('/declineMatchedUser', authMiddleware('User'), emailCheckMiddleware,advertsController.declineMatchedUser)
router.post('/matchUserWithAdvert', authMiddleware('User'), emailCheckMiddleware,advertsController.matchUser)
router.post('/add',authMiddleware('User,Admin'), emailCheckMiddleware,validationMiddleware(advertValidationRules),advertsController.add)

module.exports = router