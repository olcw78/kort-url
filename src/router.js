'use strict'
const { Router } = require('express')

const r = Router({
  strict: true,
})

r.get('/', (req, res) => {
  res.render('index')
})

module.exports = r
