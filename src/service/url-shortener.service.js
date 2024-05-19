const { k } = require('../const')

/** @class */
class UrlShortener {
  /** @type {string} */
  _origin

  /** @type {number} */
  _seed

  _redis

  _lookup = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  /**
   * @constructor
   * @param {string} origin
   * @param {ReturnType<typeof import('redis').createClient>} redis
   */
  constructor(origin, redis) {
    this._origin = origin
    this._seed = 1_000_000_000_000
    this._redis = redis
  }

  /**
   *
   * @param {string} originalUrl
   * @returns
   */
  makeShortenedUrl(originalUrl) {
    try {
      const shortenedUrl = this.base10To62(this._seed)

      this._redis.SET(originalUrl, this._seed)
      this._redis.SET(this._seed.toString(), originalUrl)

      return `${this._origin}${shortenedUrl}`
    } catch (error) {
      error
    } finally {
      ++this._seed
    }
  }

  /**
   *
   * @param {string} shortenedUrl
   */
  async makeOriginalUrl(shortenedUrl) {
    const [, param] = shortenedUrl.split(this._origin)
    const n10 = this.base62To10(param)

    const originalUrl = await this._redis.GET(n10.toString())

    return originalUrl
  }

  /**
   *
   * @param {number} n
   * @returns {string}
   */
  base10To62(n) {
    const ret = []

    while (n != 0) {
      ret.unshift(this._lookup.charAt(n % 62))
      n = Math.trunc(n / 62)
    }

    const lackLen = k.SHORTENED_URL_LEN - ret.length
    if (lackLen > 0) {
      ret.unshift('0'.repeat(lackLen))
    }

    return ret.reduce((acc, cur) => acc.toString() + cur.toString(), '')
  }

  /**
   *
   * @param {string} n
   */
  base62To10(n) {
    let x = 0
    for (const ch of n) {
      const n10 = this.convertFromLookup(ch)
      x = x * 62 + n10
    }

    return x
  }

  /**
   * @param {string} ch
   */
  convertFromLookup(ch) {
    if (ch >= '0' && ch <= '9') {
      return ch.charCodeAt(0) - '0'.charCodeAt(0)
    }

    if (ch >= 'a' && ch <= 'z') {
      const offset = 10
      return ch.charCodeAt(0) - 'a'.charCodeAt(0) + offset
    }

    if (ch >= 'A' && ch <= 'Z') {
      const offset = 36
      return ch.charCodeAt(0) - 'A'.charCodeAt(0) + offset
    }

    return -1
  }
}

/**
 *
 * @param {ReturnType<typeof createClient>} redisClient
 * @param {string} originalUrl
 * @returns {string}
 */
// function makeShortenUrl(redisClient, originalUrl, seed) {
//   const shortUrl = base10ToBase62(seed)
//   redisClient.SET(originalUrl, seed)
//   redisClient.SET(seed.toString(), originalUrl)

//   ++seed

//   return {
//     shortened_url: shortUrl,
//     seed: seed - 1,
//   }
// }

/**
 * @param {ReturnType<typeof createClient>} redisClient
 * @param {string} shortenedUrl
 */
// async function makeUrlOriginal(redisClient, shortenedUrl) {
//   const param = shortenedUrl.split(origin)[1]
//   const n10 = base62ToBase10(param)

//   const originalUrl = await redisClient.GET(n10.toString())

//   return originalUrl
// }

/**
 *
 * @param {number} n
 * @returns {string}
 */
// function base10ToBase62(n) {
//   const ret = []

//   while (n != 0) {
//     ret.unshift(lookup.charAt(n % 62))
//     n = Math.trunc(n / 62)
//   }

//   const diff = k.SHORTEN_URL_LEN - ret.length
//   if (diff > 0) {
//     ret.unshift('0'.repeat(diff))
//   }

//   return ret.reduce((a, b) => a.toString() + b.toString(), '')
// }

/**
 *
 * @param {string} s
 * @returns {number}
 */
// function base62ToBase10(s) {
//   let x = 0
//   for (let i = 0; i < s.length; i++) {
//     const n10 = convert(s.charAt(i))
//     x = x * 62 + n10
//   }

//   return x
// }

module.exports = UrlShortener
