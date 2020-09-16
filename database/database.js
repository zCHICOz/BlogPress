const Sequelize = require('sequelize')

const connection = new Sequelize('blogpresstest', 'chicoz777', '#Chico013', {
  host: 'mysql669.umbler.com',
  dialect: 'mysql',
  timezone: '-03:00'
})

module.exports = connection