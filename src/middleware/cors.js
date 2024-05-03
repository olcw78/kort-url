const cors = require('cors')

/** @param {import('express').Application} app */
module.exports = function useCors(app) {
  app.use(
    cors({
      origin: '*',
    })
  )
  req.log.debug(`[cors] loaded (${module.path})`)
}
