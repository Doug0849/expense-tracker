const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const record = require('../../models/record')


router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({userId})
    .lean()
    .sort({ _id: 'desc' })
    .then(records => {
      let totalAmount = 0
      records.forEach( record => {
        totalAmount += Number(record.amount)
      })
      return Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
          return res.render('index', { records, categories, totalAmount })
        })
    })
    .catch(error => console.log(error))
})

router.get('/category', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.category
  return Record.find({ userId, categoryId })
    .lean()
    .sort({ _id: 'desc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += Number(record.amount)
      })
      return Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
          const correctCategory = categories.find( category => {
            return category._id.toString() === categoryId
          }).name
          return res.render('index', { records, categories, totalAmount, correctCategory })
        })
    })
    .catch(error => console.log(error))
})

module.exports = router