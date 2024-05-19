'use strict'

const pino = require('pino')
const knex = require('knex')
const redis = require('redis')
const env = require('../env')

const UrlShortener = require('../service/url-shortener.service')

/** @param {import('express').Application} app */
module.exports = async function provide(app) {
  // provide pino
  const logger = pino({
    ...(app.get('env') === 'development' && {
      transport: {
        target: 'pino-pretty',
      },
    }),
  })
  app.locals.log ??= logger

  // provide knex with mysql2
  app.locals.knex ??= knex({
    client: env.client,
    connection: env.connection,
    debug: true,
    asyncStackTraces: true,
    log: {
      enableColors: true,
      debug(msg) {
        logger.debug(msg)
      },
      warn(msg) {
        logger.warn(msg)
      },
      error(msg) {
        logger.error(msg)
      },
    },
  })

  // provide redis
  const redisClient = new redis.createClient({
    url: env.redis.url,
  })
  await redisClient.connect()
  app.locals.redis ??= redisClient

  // provide urlShortener
  app.locals.urlShortener = new UrlShortener(env.origin, redisClient)
}
