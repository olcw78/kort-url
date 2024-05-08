'use strict'
// load dotenv
const env = require('./src/env')
const createApp = require('./src/app')

async function main() {
  const app = createApp()
  const listener = app.listen(env.port, function () {
    const addr = listener.address()
    console.log(`express listening at ${addr.port} [${app.get('env')}]`)
  })
}

main()
