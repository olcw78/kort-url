'use strict'
const path = require('node:path')

const dotenv = require('dotenv')
dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
  debug: true,
})

const { PORT, REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env

module.exports = {
  port: PORT || 8000,
  redis: {
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
  },
}
