const session = require('express-session')
const { makeRedisStore } = require('../external/redis')

/** @param {import('express').Application} app */
module.exports = function useRedisSession(app) {
  app.use(async (req, res, next) => {
    const redisStore = await makeRedisStore(req.redis, {})

    session({
      store: redisStore,
      saveUninitialized: true,
    })
  })
}
