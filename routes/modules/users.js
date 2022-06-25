const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.render('index')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '除了名字，其他欄位都是必填。' })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符' })
      }
      if (errors.length) {
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req,res) => {
  res.logout()
  res.redirect('/users/login')
})

module.exports = router