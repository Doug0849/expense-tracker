const express = require('express')
const router = express.Router()

const Record = require('../../models/record')


router.get('/', (req, res) => {
  res.render('record')
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
          .then(() => res.redirect('/'))
})


module.exports = router