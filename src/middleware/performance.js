'use strict'
/** @param {import('express').Application} app */
module.exports = function usePerformace(app) {
  app.use((req, res, next) => {
    req.reqTime = performance.now()
    next()
  })
}
