const express = require('express')
const {stock} = require('tushare')
const router = express.Router()

router.get('/getIndex', (req, res) => {
  stock.getIndex().then(({ data }) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.send(data)
  })
})

module.exports = router