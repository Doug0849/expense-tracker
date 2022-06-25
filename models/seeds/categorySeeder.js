const Record = require('../record')
const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

const categoryArray = Object.keys(CATEGORY)
const iconHttpArray = Object.values(CATEGORY)

db.once('open', () => {
  for (let i = 0; i < categoryArray.length; i++) {
    Category.create({
      id: i,
      name: categoryArray[i],
      icon: iconHttpArray[i],
    })
  }
  console.log('done')
})

// 要改使用 Promise.all 的寫法