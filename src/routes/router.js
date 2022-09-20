const express = require('express');
const todoRouter = require('./todo.routes')
const authRouter = require('./auth.routes')
const uploadFileRouter = require('./upload.routes')

const AppRouter = express()

AppRouter.use('/todo', todoRouter)
AppRouter.use('/auth', authRouter)
AppRouter.use('/upload', uploadFileRouter)

module.exports = AppRouter
