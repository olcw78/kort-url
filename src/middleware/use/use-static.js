'use strict'
const express = require('express')

/** @param {express.Application} app */
module.exports = function useStatic(app) {
  app.use(express.static('public'))
}
