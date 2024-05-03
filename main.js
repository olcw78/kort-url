// load dotenv
const env = require('./src/env')
const app = require('./src/app')

const listener = app.listen(env.port, function () {
  const addr = listener.address()
  const origin = `${addr.address}:${addr.port}`

  console.log(`express listening at ${origin}`)
})
