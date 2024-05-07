'use strict'
const redis = require('redis')
const RedisStore = require('connect-redis').default

/** @param {redis.RedisClientOptions} opt  */
async function makeRedisClient(opt) {
  const redisClient = redis.createClient({ ...opt })

  return redisClient.connect()
}

/**
 *
 * @param {} opt
 * @returns
 */
async function makeRedisStore(client, opt) {
  const redisStore = new RedisStore({ client, ...opt })

  return redisStore
}

module.exports = {
  makeRedisClient,
  makeRedisStore,
}
