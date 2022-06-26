const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

const categoryFromDB = []
Category.find().lean().then(result => {
  let categoryFromDB = result
})

router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({userId})
    .lean()
    .sort({ _id: 'desc' })
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})

module.exports = router