'use strict'

const pino = require('pino').default

const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
})

module.exports = {
  logger,
}
