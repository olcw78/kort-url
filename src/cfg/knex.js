const knex = require('knex')
const env = require('../env')

module.exports = function makeKnex() {
  return knex({ ...env })
}
