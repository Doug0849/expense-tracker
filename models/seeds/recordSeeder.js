const Record = require('../record')
const USER = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
// const record = require('../record')

const SEED_USER = [{
  name: '廣志',
  email: 'user1@example.com',
  password: '12345678',
},
{
  name: '小新',
  email: 'user2@example.com',
  password: '12345678',
}]

const SEED_RECORD = [
  {
    id: 1,
    name: "租金",
    date: "2019-04-01",
    category: "家居物業",
    amount: 25000,
  },
  {
    id: 2,
    name: "電影：驚奇隊長",
    date: "2019-04-23",
    category: "休閒娛樂",
    amount: 220,
  },
  {
    id: 3,
    name: "捷運",
    date: "2019-04-23",
    category: "交通出行",
    amount: 120,
  },
  {
    id: 4,
    name: "晚餐",
    date: "2019-04-23",
    category: "餐飲食品",
    amount: 60,
  },
  {
    id: 5,
    name: "午餐",
    date: "2019-04-23",
    category: "餐飲食品",
    amount: 60,
  },
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map((user) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => 
          USER.create({ 
            name: user.name,
            email: user.email,
            password: hash
          }))      
        .then((user) => {
          return Promise.all(Array.from(SEED_RECORD, expanse => {
            return Category.findOne({ name: expanse.category})
                    .lean()
                    .then(category => {
                      return Record.create({
                        name:expanse.name,
                        date:expanse.date,
                        categoryId: category._id,
                        amount: expanse.amount,
                        categoryIcon: category.icon,
                        userId: user._id,
                      })
                    })
                  }))
        })
    })
  ).then(() => {
    // 等待所有使用者的餐廳資料創建完成
    console.log('所有使用者與消費資料創建完成')
    process.exit()
  }).catch(error => {
    console.log(error)
  })
})