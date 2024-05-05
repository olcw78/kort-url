'use strict'

require('express-async-error')
const express = require('express')
const autoload = require('./middleware/autoload')
const router = require('./router')
const ejs = require('ejs')
const LRU = require('lru-cache').default
const app = express()

// setup ejs
// app.set('views', path.resolve(process.cwd(), 'views'))
ejs.cache = new LRU({
  ttl: 60 * 60 * 24 * 1000,
  maxSize: 100,
})
app.engine('html', ejs.renderFile)
app.set('view engine', 'ejs')

app.use(router)

autoload(app)

module.exports = app
