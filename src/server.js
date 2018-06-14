const bodyParser = require('body-parser')
const multer = require('multer')

main().then(app => {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at PORT ${process.env.PORT || 3000}`)
  })
})

async function main () {
  const app = require('express')()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  const databaseClient = await require('./database')

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', req.get('Origin') || '')
    res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers',
      'content-type, auth-token, user, X-XSRF-TOKEN')
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Check if preflight request
    if (req.method === 'OPTIONS') {
      res.status(200)
      res.end()
    } else {
      next()
    }
  })

  app.use((req, res, next) => {
    req.models = req.models || databaseClient.models
    next()
  })
  app.get('/', (req, res) => res.sendStatus(200))
  app.post('/', multer().array(), (req, res) => {
    const date = new Date()
    const host = req.get('Origin')
    const path = req.get('Referer').slice(host.length)
    console.log(`[${date}] ${host}${path}`)
    const Access = req.models.Access
    new Access({date, host, path})
      .save()
    res.sendStatus(200)
  })
  return app
}