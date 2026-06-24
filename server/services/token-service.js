const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, 'process.env.JWT_ACCESS_KEY', { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, 'process.env.JWT_REFRESH_KEY', { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokens(userID, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userID })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return await tokenData.save()
        }
        const token = await tokenModel.create({ user: userID, refreshToken })
        return token
    }

    async removeToken(refreshToken) {
        const token = await tokenModel.deleteOne({ refreshToken })
        return token
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, 'process.env.JWT_ACCESS_KEY')
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, 'process.env.JWT_REFRESH_KEY')
            return userData
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()