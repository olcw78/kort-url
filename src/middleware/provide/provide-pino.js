'use strict'
const pino = require('pino')

/** @param {import('express').Application} app */
module.exports = function providePino(app) {
  if (app.locals.pino) {
    return
  }

  app.locals.log = pino({
    transport: {
      target: app.get('env') === 'development' ? 'pino-pretty' : 'pino',
    },
  })
}
