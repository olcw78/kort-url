'use strict'

const { performance } = require('node:perf_hooks')

// catch all async error while router, middleware
require('express-async-error')

const path = require('node:path')

const express = require('express')
const autoload = require('./util/autoload')
const router = require('./router')

module.exports = async function startApp() {
  const startTime = performance.now()
  const app = express()

  const middlewareDirRootPath = path.resolve('src', 'middleware')
  await autoload(app, middlewareDirRootPath)

  app.use(router)

  process.nextTick(() => {
    app.locals.log.info(`[startTime] ${(performance.now() - startTime).toPrecision(8)} ms`)
  })
  return app
}
