const fs = require('node:fs/promises')
const path = require('node:path')
const { logger } = require('../logger')

/** @param {import('express').Application} app */
module.exports = async function autoload(app) {
  const middlewaresPathAbs = path.resolve(__dirname)
  const dirents = await fs.readdir(middlewaresPathAbs, {
    encoding: 'utf8',
    recursive: true,
    withFileTypes: true,
  })

  const splittedSelfName = module.filename.split('/')
  const selfName = splittedSelfName[splittedSelfName.length - 1]

  const useAutoloadLog = process.env.NODE_ENV === 'development'
  let autoloadLogStr = undefined
  if (useAutoloadLog) {
    autoloadLogStr = []
  }

  for (const dir of dirents) {
    if (!dir.isFile()) continue
    if (dir.name === selfName) continue

    const modPathAbs = path.resolve(dir.path, dir.name)
    const useOrProvideMiddleware = require(modPathAbs)

    if (useAutoloadLog) {
      const { name } = useOrProvideMiddleware

      const isStartsWithUseWithinName = name.startsWith('use')
      const isStartsWithProvideWithinName = name.startsWith('provide')

      let logName = undefined
      if (isStartsWithUseWithinName) {
        logName = name.replaceAll('use', '')
        autoloadLogStr.push(logName)
      }

      if (isStartsWithProvideWithinName) {
        logName = name.replaceAll('provide', '')
        autoloadLogStr.push(logName)
      }
    }

    useOrProvideMiddleware(app)
  }

  if (useAutoloadLog) {
    logger.info(
      `[middlewares] Loading ${autoloadLogStr.length} middlewares:\n` +
        autoloadLogStr.reduce((p, c) => p + ', ' + c)
    )
  }

  autoloadLogStr = []
}
