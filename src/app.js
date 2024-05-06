'use strict'

// catch all async error while router, middleware
require('express-async-error')

const path = require('node:path')

const express = require('express')
const autoload = require('./util/autoload')
const router = require('./router')

async function startApp() {
  const app = express()

  const middlewareDirRootPath = path.resolve('src', 'middleware')
  await autoload(app, middlewareDirRootPath)

  app.use(router)
  
  return app
}

module.exports = startApp()

