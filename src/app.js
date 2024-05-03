require('express-async-error')
const express = require('express')
const autoload = require('./middleware/')

const app = express()

app.set('view engine', 'ejs')

autoload(app)

module.exports = app
