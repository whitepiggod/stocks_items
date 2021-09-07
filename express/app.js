const express = require('express')
const getHistory = require('./route/getHistory')
const getIndex = require('./route/getIndex')
const getTodayAll = require('./route/getTodayAll')
const getLiveData = require('./route/getLiveData')
const getTick = require('./route/getTick')
const app = express()

app.use('/', getHistory)
app.use('/', getIndex)
app.use('/', getTodayAll)
app.use('/', getLiveData)
app.use('/', getTick)


app.listen(3000, '127.0.0.1')