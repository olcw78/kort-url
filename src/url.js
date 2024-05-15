/**
 * @desc
 * @async
 * @param {string} original_url
 * @return {Promise<string>}
 * */
const { k } = require('./const')
const { createClient } = require('redis')

let seed = 1_000_000_000_000
const origin = 'http://kort.url/'
const lookup = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 *
 * @param {ReturnType<typeof createClient>} redisClient
 * @param {string} originalUrl
 * @returns {string}
 */
function makeShortenUrl(redisClient, originalUrl) {
  const shortUrl = base10ToBase62(seed)
  redisClient.SET(originalUrl, seed)
  redisClient.SET(seed.toString(), originalUrl)

  ++seed

  return origin + shortUrl
}

/**
 * @param {ReturnType<typeof createClient>} redisClient
 * @param {string} shortenedUrl
 */
async function makeUrlOriginal(redisClient, shortenedUrl) {
  const param = shortenedUrl.split(origin)[1]
  const n10 = base62ToBase10(param)

  const originalUrl = await redisClient.GET(n10.toString())

  return originalUrl
}

/**
 *
 * @param {number} n
 * @returns {string}
 */
function base10ToBase62(n) {
  const ret = []

  while (n != 0) {
    ret.unshift(lookup.charAt(n % 62))
    n = Math.trunc(n / 62)
  }

  const diff = k.SHORTEN_URL_LEN - ret.length
  if (diff > 0) {
    ret.unshift('0'.repeat(diff))
  }

  return ret.reduce((a, b) => a.toString() + b.toString(), '')
}

/**
 *
 * @param {string} s
 * @returns {number}
 */
function base62ToBase10(s) {
  let x = 0
  for (let i = 0; i < s.length; i++) {
    const n10 = convert(s.charAt(i))
    x = x * 62 + n10
  }

  return x
}

/**
 * @param {string} ch
 */
function convert(ch) {
  if (ch >= '0' && ch <= '9') {
    return ch.charCodeAt(0) - '0'.charCodeAt(0)
  }

  if (ch >= 'a' && ch <= 'z') {
    return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 10
  }

  if (ch >= 'A' && ch <= 'Z') {
    return ch.charCodeAt(0) - 'A'.charCodeAt(0) + 36
  }

  return -1
}

module.exports = {
  makeShortenUrl,
  makeUrlOriginal,
}
