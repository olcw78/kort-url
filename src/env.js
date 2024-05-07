'use strict'
const path = require('node:path')

const dotenv = require('dotenv')
dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
  debug: true,
  encoding: 'utf8',
})

module.exports = {
  port: process.env.PORT || 8000,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  log: {
    verbosity: process.env.LOG_VERBOSITY || 'info',
  },
  knex: {
    dialect: process.env.KNEX_DIALECT || 'mysql2',
  },
  mysql: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '0000',
    database: process.env.MYSQL_DATABASE || 'local',
  },
}
