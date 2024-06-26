'use strict'

// const session = require('express-session')
const express = require('express')
const compression = require('compression')
const { pinoHttp } = require('pino-http')
const responseTime = require('response-time')
const ejs = require('ejs')
const LRU = require('lru-cache').default

/** @param {import('express').Application} app */
module.exports = function (app) {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // use static
  app.use(express.static('public'))

  // use ejs
  ejs.cache = new LRU({
    ttl: 60 * 60 * 24 * 1000,
    maxSize: 100,
  })
  app.engine('html', ejs.renderFile)
  app.set('view engine', 'ejs')

  // use session with redis
  // app.use((req, res, next) => {
  //   session({
  //     store: makeRedisStore(app.locals.redis, {}),
  //     saveUninitialized: false,
  //     resave: false,
  //   })
  //   next()
  // })

  // use response time
  app.use(responseTime())

  // use pino http alternative to morgan
  app.use(
    pinoHttp({
      autoLogging: true,
      transport: {
        target: app.get('env') === 'development' ? 'pino-pretty' : 'pino',
      },
    })
  )

  // use compression
  app.use(compression())
}
