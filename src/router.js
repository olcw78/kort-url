'use strict'

const { Router } = require('express')

const UrlController = require('./controller/url.controller')

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

r.get('/v1/get', UrlController.redirectToOriginalUrl)

r.post('/v1/create', UrlController.createShortenedUrl)

module.exports = r
