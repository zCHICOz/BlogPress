const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Category.hasMany(Article) // Tem muitos ===   1 pra n
Article.belongsTo(Category) // UM artigo pertence a UMA categoria ===  1 pra 1 

module.exports = Article;