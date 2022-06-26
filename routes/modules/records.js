const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/', (req, res) => {
  return Category.find()
    .lean()
    .sort({_id:'asc'})
    .then((category) => {
      return res.render('record', { category })
    })
    .catch(error => console.log(error))
  })
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  const userId = req.user._id
  return Record.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      if (record.category === "家居物業") {
        const category1 = 'selected'
        return res.render('edit', { record, category1})
      }
      if (record.category === "交通出行") {
        const category2 = 'selected'
        return res.render('edit', { record, category2 })
      }
      if (record.category === "休閒娛樂") {
        const category3 = 'selected'
        return res.render('edit', { record, category3 })
      }
      if (record.category === "餐飲食品") {
        const category4 = 'selected'
        return res.render('edit', { record, category4 })
      }
      if (record.category === "其他") {
        const category5 = 'selected'
        return res.render('edit', { record, category5 })
      }
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
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