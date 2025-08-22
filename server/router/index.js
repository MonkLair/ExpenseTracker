const Router = require('express').Router

const userController = require('../controllers/user-controller')
const router = new Router()
const { body } = require('express-validator')

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    body('name').isLength({ min: 4, max: 30 }),
    userController.register
)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 32 }),
    userController.login
)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)


module.exports = router