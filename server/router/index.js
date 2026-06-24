const Router = require('express').Router

const dataController = require('../controllers/data-controller')
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
router.post('/update', dataController.update)
router.put('/updatePassword', userController.updatePassword)
router.put('/updateName', userController.updateName)
router.put('/updateEmail', userController.updateEmail)
router.put('/changeCurrency', dataController.changeCurrency)

module.exports = router