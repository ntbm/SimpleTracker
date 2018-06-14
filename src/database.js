const Sequelize = require('sequelize')

module.exports = database_client_factory()

async function database_client_factory () {
  let client = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    storage: 'database.sqlite'
  })
  await registerModels(client)
  await client.sync({
    force: process.env.create_db && process.env.create_db === 'true'
  })
  return client
}
async function registerModels (client) {
  require('./models/Access')(client)
}