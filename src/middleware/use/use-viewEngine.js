const ejs = require('ejs')
const LRU = require('lru-cache').default

/** @param {import('express').Application} app */
module.exports = function useViewEngine(app) {
  // setup ejs
  // app.set('views', path.resolve(process.cwd(), 'views'))
  ejs.cache = new LRU({
    ttl: 60 * 60 * 24 * 1000,
    maxSize: 100,
  })
  app.engine('html', ejs.renderFile)
  app.set('view engine', 'ejs')
}
