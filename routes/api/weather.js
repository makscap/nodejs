const express = require('express')
const {query, validationResult} = require('express-validator')
const got = require('got')
const router = express.Router()

const validator = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()})
    }
    // Если вызиваем просто некст() то это значит "иди дальше выполняйся"
    next()
}

// Добавляем дотенв
require('dotenv').config()


// Добавили валидацию [query('lat').isNumeric, query('lon').isNumeric], validator
router.get('/',
[query('lat').isNumeric(), query('lon').isNumeric()],
validator,
async (req,res, next) => {
    const {lat, lon} = req.query
    // Вытягиваем переменную с ключем
    const apiKey = process.env.API_KEY
    try {
        // В респонс положили ответ от ГОТ
        const response = await got('http://api.openweathermap.org/data/2.5/weather', {
            searchParams: {
                lat, lon, appid: apiKey,
            }
        })
        const {weather, wind, name} = JSON.parse(response.body)
        res.json({weather, wind, name})
    }
    catch (e) {
        // Пробрасываем ошибку
        next(e)
    }

})

module.exports = router