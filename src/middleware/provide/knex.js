const knex = require('knex')

/** @param {import('express').Application} app */
module.exports = function provideKnex(app) {
  app.use((req, res, next) => {
    try {
      const $knex = knex({
        dialect: 'mysql2',
        connection: {},
      })

      if (!res.locals.knex || res.locals.knex === $knex) {
        res.locals.knex = null
      }

      res.locals.knex = $knex

      req.log.debug(`[knex] loaded (${module.path})`)
      next()
    } catch (error) {}
  })
}
