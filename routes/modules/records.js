const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/', (req, res) => {
  return Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((category) => {
      return res.render('record', { category })
    })
    .catch(error => console.log(error))
})
router.post('/', (req, res) => {
  const { name, date, categoryId, amount } = req.body
  const userId = req.user._id
  return Category.findOne({ categoryId })
    .then(category => {
      const categoryIcon = category.icon
      return Record.create({ name, date, categoryId, amount, categoryIcon, userId })
        .then(() => res.redirect('/'))
    })
  
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      return Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then( categories => {
          const correctCategory = categories.find( category => {
            return category._id.toString() === record.categoryId.toString()
          })
          return res.render('edit', { record, categories, correctCategory })
        })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
  .then(record => {
    return Category.findOne({ _id: req.body.categoryId })
      .then(category => {
        record.categoryId = category._id
        record.categoryIcon = category.icon
        record = Object.assign(record, req.body)
        return record.save()      
      })
    }).then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id/delete', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record = record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router