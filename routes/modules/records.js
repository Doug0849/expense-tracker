const express = require('express')
const router = express.Router()
const Record = require('./records')


router.get('/', (req, res) => {
  res.render('record')
})

router.post('/', (req, res) => {
  
})


module.exports = router