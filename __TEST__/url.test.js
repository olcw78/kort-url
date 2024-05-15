const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { makeShortenUrl, makeUrlOriginal } = require('../src/url')
const redis = require('redis')
const env = require('../src/env')

let redisClient

describe('url test', () => {
  beforeAll(async () => {
    redisClient = new redis.createClient({
      url: env.redis.url,
    })
    await redisClient.connect()
  })

  afterAll(async () => {
    await redisClient.disconnect()
  })

  it('should shortened url matched the original url', async () => {
    const url = 'https://www.npmjs.com/package/redis-mock'
    let result = makeShortenUrl(redisClient, url)
    result = await makeUrlOriginal(redisClient, result)

    expect(result).toBe(url)
  })
})
