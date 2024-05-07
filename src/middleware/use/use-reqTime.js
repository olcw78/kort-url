'use strict'

const { performance } = require('node:perf_hooks')

/** @param {import('express').Application} app */
module.exports = function useReqTime(app) {
  app.use(function hookBeforeRequest(req, res, next) {
    res.locals.reqTime = performance.now()
    next()
  })

  app.use(function hookAfterRequest(req, res, next) {
    if (req.reqTime === undefined) {
      next()
    }

    function afterResponse() {
      res
        .removeListener('finish', afterResponse)
        .removeListener('close', afterResponse)

      const elapsedTime = req.reqTime - performance.now()
      app.locals.log.info(`[elapsedTime] ${elapsedTime} ms`)

      req.reqTime = undefined
    }

    res.on('finish', afterResponse).on('close', afterResponse)

    next()
  })
}
