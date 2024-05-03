const { pinoHttp } = require('pino-http')

/** @param {import('express').Application} app */
module.exports = function providePinoHttp(app) {
  app.use(
    pinoHttp({
      autoLogging: true,
      transport: 'pino-pretty',
      hooks: {
        logMethod(args, method, level) {
          req.log.debug(`[pino-http] loaded (${module.path})`)
        },
      },
    })
  )
}
