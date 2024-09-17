const router = require('express').Router()
const usersController = require('../controllers/usersController')
const authMiddleware = require('../middlewares/authMiddleware').requireAuth

router.get('/', authMiddleware('Admin'),usersController.getAll)
router.get('/:id', authMiddleware('User,Admin'),usersController.getById)
router.post('/update', authMiddleware('Admin'), usersController.update)

module.exports = router
