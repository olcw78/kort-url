'use strict'
// load dotenv
const env = require('./src/env')
const app = require('./src/app')

async function main() {
  const listener = (await app).listen(env.port, function () {
    const addr = listener.address()
    console.log(`express listening at ${addr.port}`)
  })
}

main()
