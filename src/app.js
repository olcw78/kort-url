'use strict'

// catch all async error while router, middleware
require('express-async-error')

const { performance } = require('node:perf_hooks')
const express = require('express')
const provide = require('./middleware/provide')
const use = require('./middleware/use')

const renderRoutes = require('./routes/render.routes')
const urlRoutes = require('./routes/url.routes')

module.exports = function startApp() {
  const startTime = performance.now()
  const app = express()

  provide(app)
  use(app)

  app.use(renderRoutes)
  app.use(urlRoutes)

  app.locals.log.info(
    `[startTime] ${(performance.now() - startTime).toPrecision(8)} ms`
  )

  return app
}
