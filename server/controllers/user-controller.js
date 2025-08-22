const userService = require('../services/user-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController {
    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Недопустимый пароль иль email', errors.array()))
            }
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 3600 * 1000 })
            return res.json()
        } catch (e) {
            next(e)
        }
    }

    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Поля заполнены неккоректно', errors.array()))
            }
            const { name, email, password } = req.body
            const userData = await userService.register(name, email, password)
            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 3600 * 1000 })
            return res.json()

        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 3600 * 1000 })
            return res.json()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController