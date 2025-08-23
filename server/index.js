require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const ErrorMiddleware = require('./middlewares/error-middleware')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/', router)
app.use(ErrorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {})
        app.listen(process.env.PORT, () => console.log(`Сервер открыт на порту: ${process.env.PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()