const express = require('express')
const {stock} = require('tushare')
const router = express.Router()

router.get('/getLiveData', (req, res) => {
  const { code } = req.query
  stock.getLiveData({
    codes: [code]
  }).then(({ data }) => {
    res.header("Access-Control-Allow-Origin", "*")
    console.log(data)
    res.send(data)
  })
})

module.exports = router