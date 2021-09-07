const express = require('express')
const {stock} = require('tushare')
const router = express.Router()

router.get('/getHistory', (req, res) => {
  stock.getHistory(req.query).then(({ data }) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.send(data)
  })
})

module.exports = router