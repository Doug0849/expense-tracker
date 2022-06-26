const Record = require('../record')
const USER = require('../user')
const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
// const record = require('../record')

const SEED_USER = [{
  name: '廣志',
  email: 'user1@example.com',
  password: '123',
},
{
  name: '小新',
  email: 'user2@example.com',
  password: '123',
}]

const SEED_RECORD = [
  {
    id: 1,
    name: "租金",
    date: "2019-04-01",
    category: "1",
    amount: 25000,
  },
  {
    id: 2,
    name: "電影：驚奇隊長",
    date: "2019-04-23",
    category: "3",
    amount: 220,
  },
  {
    id: 3,
    name: "捷運",
    date: "2019-04-23",
    category: "2",
    amount: 120,
  },
  {
    id: 4,
    name: "晚餐",
    date: "2019-04-23",
    category: "4",
    amount: 60,
  },
  {
    id: 5,
    name: "午餐",
    date: "2019-04-23",
    category: "4",
    amount: 60,
  },
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map((user, user_index) => {
      // 創建使用者資料(user): model.create
      return USER.create({ ...user })
        .then((user) => {
          // 對每個user建立相對應餐廳資料
          const userRecord = []
          SEED_RECORD.forEach((record, record_index) => {
            if (record_index >= 3 * user_index && record_index < 3 * (user_index + 1)) {
              record.userId = user._id
              userRecord.push(record)
            }
          })
          return Record.create(userRecord)
        })
    })
  ).then(() => {
    // 等待所有使用者的餐廳資料創建完成
    console.log('所有使用者與餐廳資料創建完成')
    process.exit()
  }).catch(error => {
    console.log(error)
  })
})

// db.once('open', () => {
//   new Promise((resolve, _reject) => {
//     for (const [user_index, user] of SEED_USER.entries()) {
//       // 創建使用者資料(user): model.create
//       USER.create({
//         ...user
//       }).then((user) => {
//         // 對每個user建立相對應餐廳資料
//         console.log('user created')
//         const userRecord = []
//         SEED_RECORD.forEach((record, record_index) => {
//           if (record_index >= 3 * user_index && record_index < 3 * (user_index + 1)) {
//             record.userId = user._id
//             userRecord.push(record)
//           }
//         })
//         return Record.create(userRecord)
//       }).then(() => {
//         resolve()
//       }).catch(error => {
//         console.log(error)
//       })
//     }
//   }).then(() => {
//     // 等待所有使用者的餐廳資料創建完成
//     console.log('所有使用者與餐廳資料創建完成')
//     process.exit()
//   })
// })


// const userRecord = []

// db.once('open', () => {
//   new Promise((resolve, _reject) => {
//     for (const [user_index, user] of SEED_USER.entries()) {
//       USER.create({
//         ...user
//       }).then((user) => {
//         console.log('user created')
//         SEED_RECORD.forEach((record, record_index) => {
//           if (record_index >= 3 * user_index && record_index < 3 * (user_index + 1)) {
//             record.userId = user._id
//             userRecord.push(record)
//           }
//           return Record.create(...userRecord)
//         })
//       }).catch(error => {
//         console.log(error)
//       })
//     }
//   }).then(() => {
//     console.log('所有使用者與花費紀錄創建完成')
//   })

//   new Promise((resolve, _reject) => {
//     Category.find()
//       .then((category) => {
//         userRecord.forEach((record) => {
//           if (category.id === record.categoryId) {
//             record.categoryId = category._id
//           }
//         })
//         return Record.save(...userRecord)
//       })
//   }).then(() => {
//     console.log('categoryId替換完成')
//   })
// })