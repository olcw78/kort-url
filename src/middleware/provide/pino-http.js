const { pinoHttp } = require('pino-http')

/** @param {import('express').Application} app */
module.exports = function providePinoHttp(app) {
  app.use(
    pinoHttp({
      autoLogging: true,
    })
  )
}
