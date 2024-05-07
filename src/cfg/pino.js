'use strict'
const pino = require('pino')

/** @param {boolean} isDevenv */
module.exports = function makePino(isDevenv) {
  const opt = isDevenv
    ? {
        transport: {
          target: 'pino-pretty',
        },
      }
    : undefined

  return pino(opt)
}
