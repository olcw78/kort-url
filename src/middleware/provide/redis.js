const { makeRedisClient } = require('../../external/redis')

/** @param {import('express').Application} app */
module.exports = function provideRedis(app) {
  app.use((req, res, next) => {
    makeRedisClient({}).then((redis) => {
      if (res.locals.redis || res.locals.redis === redis) {
        res.locals.redis = null
      }

      res.locals.redis = redis

      next()
    })
  })
}
