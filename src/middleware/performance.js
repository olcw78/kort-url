'use strict'
/** @param {import('express').Application} app */
module.exports = function usePerformace(app) {
  app.use((req, res, next) => {
    req.reqTime = performance.now()
    next()
  })

  app.use((req, res, next) => {
    function afterResponse() {
      res.removeListener('finish', afterResponse)
      res.removeListener('close', afterResponse)

      const elapsedTime = req.reqTime - performance.now()
      req.log.info(`[elapsedTime] ${elapsedTime} ms`)

      req.reqTime = undefined
    }

    res.on('finish', afterResponse)
    res.on('close', afterResponse)

    next()
  })
}
