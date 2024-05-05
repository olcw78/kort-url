'use strict'
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

module.exports = r
