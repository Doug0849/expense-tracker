const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
// const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const port = process.env.PORT

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine','hbs')

app.use(express.static('public'))

app.use(express.urlencoded({extended: true })) //body-parser
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log('Server is started on http://localhost:3000 ...')
})