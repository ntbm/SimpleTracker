const Sequelize = require('sequelize')

module.exports = (dbClient) => {
  const Access = dbClient.define('Access', {
    date: {
      type: Sequelize.DataTypes.DATE,
      required: true
    },
    host: {
      type: Sequelize.DataTypes.STRING,
      required: true
    },
    path: {
      type: Sequelize.DataTypes.STRING,
      required: true
    }
  })
  return Access
}