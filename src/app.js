'use strict'

require('express-async-error')
const path = require('node:path')
const express = require('express')
const autoload = require('./middleware/autoload')
const router = require('./router')
const ejs = require('ejs')

const app = express()

// setup ejs
// app.set('views', path.resolve(process.cwd(), 'views'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'ejs')

app.use(router)

autoload(app)

module.exports = app
