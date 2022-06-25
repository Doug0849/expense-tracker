const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


router.get('/', (req, res) => {
  const CATEGORY = {
    家居物業: "https://fontawesome.com/icons/home?style=solid",
    交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
    休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
    餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
    其他: "https://fontawesome.com/icons/pen?style=solid"
  }
  Record.find()
  .lean()
  .sort({_id:'desc'})
    .then(records => res.render('index', { records, CATEGORY }))
  .catch(error => console.log(error))
})




module.exports = router