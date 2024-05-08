'use strict'

import env from './env'

const { Router } = require('express')

const r = Router({
  strict: true,
})

r.get('/', (req, res) => {
  res.render('index')
})

r.get('/ejs', (req, res) => {
  const people = ['yoon', 'linda', 'jackie', 'ryan']
  res.render('ejs', { people })
})

r.get('/shortify', async (req, res) => {
  const { url } = req.body
  const { redis, knex } = req.app.locals
  const cacheKey = `shortify:${url}`
  try {
    const cachedUrl = await redis.GET(cacheKey)

    await knex().transacting()
    await knex().select('*').from('urls').where('userId', )
    if (!cachedUrl) {
      await redis.SETEX(cacheKey, url, env.ttl)
    }

    res.status(200).json({ message: 'OK', url: '' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = r
