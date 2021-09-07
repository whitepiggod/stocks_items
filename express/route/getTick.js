const express = require('express')
const {stock} = require('tushare')
const router = express.Router()

// router.get('/getTick', (req, res) => {
//   const options = {
//     start: '2021-09-06',
//     end: '2021-09-06',
//     pageNo: 1,
//     pageSize: 15
//   }
//   stock.lhb(options).then(({ data }) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     console.log(data)
//     res.send(data)
//   })
// })

router.get('/getTick', (req, res) => {
  const options = {
    code: '600744',
    end: '15:00:00'
  }
  stock.getSinaDD().then(({ data }) => {
    res.header("Access-Control-Allow-Origin", "*")
    console.log(data)
    res.send(data)
  })
})

module.exports = router