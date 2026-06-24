const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const tokenModel = require('../models/token-model')
const userModel = require('../models/user-model')
const dataService = require('./data-service')


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
        const userData = await dataService.createData(userDto.id)

        return {
            ...tokens,
            user: userDto,
            userData
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
        const userData = await dataService.getUserData(userDto.id)

        return {
            ...tokens,
            user: userDto,
            userData
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
        const userExpenseData = await dataService.getUserData(userDto.id)

        return {
            ...tokens,
            user: userDto,
            userData: userExpenseData
        }
    }

    async updatePassword(password, newPassword, email) {
        const user = await UserModel.findOne({ email })
        const userDto = new UserDto(user)
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const newHashPassword = await bcrypt.hash(newPassword, 3)
        user.password = newHashPassword
        await user.save()
        return userDto
    }

    async updateName(newName, email) {
        const user = await UserModel.findOne({ email })
        user.name = newName
        await user.save()
        const userDto = new UserDto(user)
        return userDto
    }

    async updateEmail(newEmail, email) {
        const user = await UserModel.findOne({ email })
        user.email = newEmail
        await user.save()
        const userDto = new UserDto(user)
        return userDto
    }
}

module.exports = new UserService()