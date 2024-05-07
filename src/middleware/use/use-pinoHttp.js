'use strict'
const { pinoHttp } = require('pino-http')

/** @param {import('express').Application} app */
module.exports = function usePinoHttp(app) {
  app.use(
    pinoHttp({
      autoLogging: true,
      transport: {
        target: app.get('env') === 'development' ? 'pino-pretty' : 'pino',
      },
    }),
  )
}
