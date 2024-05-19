const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const UrlShortener = require('../src/service/url-shortener.service')
const redis = require('redis')
const env = require('../src/env')

/** @type {ReturnType<typeof redis.createClient>} */
let redisClient

/** @type {UrlShortener} */
let urlShortener

describe('url test', () => {
  beforeAll(async () => {
    redisClient = new redis.createClient({
      url: env.redis.url,
    })
    await redisClient.connect()

    urlShortener = new UrlShortener(env.origin, redisClient)
  })

  afterAll(async () => {
    await redisClient.disconnect()
  })

  it('should shortened url matched the original url', async () => {
    const url = 'https://www.npmjs.com/package/redis-mock'

    let res = urlShortener.makeShortenedUrl(url)
    res = await urlShortener.makeOriginalUrl(res)

    expect(res).toBe(url)
  })
})
