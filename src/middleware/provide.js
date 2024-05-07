'use strict'

const makeKnex = require('../cfg/knex')
const makePino = require('../cfg/pino')
const { makeRedisClient } = require('../cfg/redis')

/** @param {import('express').Application} app */
module.exports = async function provide(app) {
  // provide knex with mysql2
  app.locals.knex ??= makeKnex()

  // provide pino
  const isDevenv = app.get('env')
  app.locals.log ??= makePino(isDevenv)

  // provide redis
  app.locals.redis ??= await makeRedisClient()
}
