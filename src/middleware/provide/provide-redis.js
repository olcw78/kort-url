'use strict'
const { makeRedisClient } = require('../../external/redis')

/** @param {import('express').Application} app */
module.exports = function provideRedis(app) {
  makeRedisClient({}).then((redis) => {
    if (app.locals.redis) {
      return
    }

    app.locals.redis = redis
  })
}
