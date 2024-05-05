'use strict'
const express = require('express')
const path = require('node:path')

/** @param {express.Application} app */
module.exports = function useStatic(app) {
  app.use(express.static(path.resolve(process.cwd(), 'public')))
}
