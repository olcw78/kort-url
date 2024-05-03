const session = require('express-session')
const { makeRedisStore } = require('../external/redis')

/** @param {import('express').Application} app */
module.exports = function useRedisSession(app) {
  app.use(async (req, res, next) => {
    /** @type {import('connect-redis').default} */
    let redisStore

    try {
      redisStore = await makeRedisStore(req.redis, {})
    } catch (error) {
      req.log.error(error)
      next(error)
    }

    return async function (req, res, next) {
      session({
        store: redisStore,
        saveUninitialized: true,
      })
      next()
    }
  })
}
