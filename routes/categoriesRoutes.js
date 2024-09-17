const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')
const authMiddleware = require('../middlewares/authMiddleware').requireAuth
const validationMiddleware = require('../middlewares/validationMiddleware').validate
const categoryValidationRules = require('../validationRules/index').category

router.get('/', categoriesController.getAll)
router.get('/:id', categoriesController.getById)
router.post('/add', authMiddleware('Admin'), validationMiddleware(categoryValidationRules),categoriesController.add)
router.post('/update', authMiddleware('Admin'), validationMiddleware(categoryValidationRules),categoriesController.update)
router.post('/:id', authMiddleware('Admin'),categoriesController.delete)

module.exports = router