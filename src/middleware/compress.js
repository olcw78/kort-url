'use strict'
const compression = require('compression')

/** @param {import('express').Application} app */
module.exports = function useCompress(app) {
  app.use(compression({}))
}
