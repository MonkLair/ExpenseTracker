const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const tokenModel = require('../models/token-model')
const userModel = require('../models/user-model')


class UserService {
    async register(name, email, password) {
        const possibleUser = await UserModel.findOne({ email })
        if (possibleUser) {
            throw ApiError.BadRequest('Вы уже зарегестрированы')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({ name, email, password: hashPassword })

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        const token = await tokenService.saveTokens(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Вы не зарегестрированы')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        const token = await tokenService.saveTokens(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenModel.findOne({ refreshToken })
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await userModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        const token = await tokenService.saveTokens(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()