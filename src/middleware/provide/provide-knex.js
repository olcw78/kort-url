'use strict'
const knex = require('knex')

/** @param {import('express').Application} app */
module.exports = function provideKnex(app) {
  if (app.locals.knex) {
    return
  }

  const $knex = knex({
    dialect: 'mysql2',
    connection: {},
  })
  app.locals.knex = $knex
}
