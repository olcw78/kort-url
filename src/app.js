'use strict'
require('express-async-error')
const express = require('express')
const autoload = require('./middleware/autoload')

const app = express()

app.set('view engine', 'ejs')

autoload(app)

module.exports = app
