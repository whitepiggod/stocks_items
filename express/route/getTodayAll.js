const express = require('express')
const {stock} = require('tushare')
const router = express.Router()

router.get('/getTodayAll', (req, res) => {
  stock.getTodayAll(req.query).then(({ data }) => {
    res.send(data)
    // console.log(data)
  })
})

module.exports = router