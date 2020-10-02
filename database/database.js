const Sequelize = require('sequelize')

const connection = new Sequelize('', '', '', {
  host: '',
  dialect: 'mysql',
  timezone: '-03:00'
})

module.exports = connection