// Логика приложение

const express = require('express')
const logger = require('morgan')
const app = express()
const weatherRouter = require('./routes/api/weather')

// Логика марштрутов

// Подключаем логгер
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Если пришел сюда, то, пожалуйста, иди в этот файл
app.use('/weather', weatherRouter)

// Обработчик левых запросов
app.use((_req, res) => {
    res.status(404).send({message: 'NOT FOUND!'})
})

// Обработчик ошибок (должно быть ровно 4-и ПАРАМЕТРА! )
app.use((err, _req, res, _next) => {
        res.status(500).send({message: err.message})
})

module.exports = app
