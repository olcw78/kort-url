const fs = require('node:fs/promises')
const path = require('node:path')

/** @param {import('express').Application} app */
module.exports = async function autoload(app) {
  const middlewaresPathAbs = path.resolve(__dirname)
  const direntries = await fs.readdir(middlewaresPathAbs, {
    encoding: 'utf8',
    recursive: true,
    withFileTypes: true,
  })

  const autoloadedModules = direntries
    .filter((direntry) => direntry.isFile())
    .map((direntry) => require(direntry.path))

  for (const mod of autoloadedModules) {
    app.use(mod)
  }
}
