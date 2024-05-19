'use strict'

const { Router } = require('express')
const UrlController = require('../controller/url.controller')

const r = Router({
  strict: true,
})

r.get('/v1/get', UrlController.redirectToOriginalUrl)

r.post('/v1/create', UrlController.createShortenedUrl)

module.exports = r
