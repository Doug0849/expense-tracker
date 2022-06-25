const express = require('express')
const router = express.Router()
const Record = require('./records')


router.get('/', (req, res) => {
  res.render('record')
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = user.id
  Record.create( name, date, category, amount, userId)
})


module.exports = router