const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, {message: '此電子信箱已經註冊'})
      }
      return bcrypt.compare(password, user.password)
      .then( isMatch => {
        if (!isMatch) {
          return done(null, false, { message: '電子信箱或密碼輸入錯誤' })
        }
        return done(null,user)
      })
    })
    .catch(err => done(err,null))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
        .lean()
        .then(user => done(null,user))
        .catch(err => done(err. null))
  })
}

