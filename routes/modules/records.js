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

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  return Record.findOne({ _id })
    .lean()
    .then(record => {
      if (record.category === "1") {
        const category1 = 'selected'
        return res.render('edit', { record, category1})
      }
      if (record.category === "2") {
        const category2 = 'selected'
        return res.render('edit', { record, category2 })
      }
      if (record.category === "3") {
        const category3 = 'selected'
        return res.render('edit', { record, category3 })
      }
      if (record.category === "4") {
        const category4 = 'selected'
        return res.render('edit', { record, category4 })
      }
      if (record.category === "5") {
        const category5 = 'selected'
        return res.render('edit', { record, category5 })
      }
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findOne({ _id })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.delete('/:id/delete', (req, res) => {
  const _id = req.params.id
  return Record.findOne({ _id })
    .then(record => record = record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router