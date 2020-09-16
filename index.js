const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const connection = require('./database/database')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/articlesController')
const usersController = require('./users/usersController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./users/User')

// View Engine
app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

// Sessions
app.use(session({
  secret: '#batataX123',
  cookie: {
    maxAge: 120000
  }
}))

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database
connection.authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso')
  })
  .catch((error) => {
    console.log(error)
  })

app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', usersController)

app.get('/session', (req, res) => {
  req.session.treinamento = 'Formação NodeJS'
  req.session.ano = '2020',
  req.session.email = 'chico013@gmail.com',
  req.session.user = {
    username: 'Chicão',
    email: 'email@gmail.com',
    id: 10
  }
  res.send('Sessão gerada')
})

app.get('/leitura', (req, res) => {
  res.json({ 
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    email: req.session.email,
    user: req.session.user
  })
  
})

app.get('/', (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 4
  }).then(articles => {

    Category.findAll().then(categories => {
      res.render('index', { articles: articles, categories: categories})
    })

  })
})

app.get('/:slug', (req, res) => {
  var slug = req.params.slug

  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article => {
    if(article != undefined) {
      Category.findAll().then(categories => {
        res.render('article', { article: article, categories: categories})
      })
    } else {
      res.redirect('/')
    }
  }).catch(erro => {
    res.redirect('/')
  })
})

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug
  Category.findOne({
    where: {
      slug: slug
    },
    include: [{ model: Article }]
  }).then(category => {
    if(category != undefined) {

      Category.findAll().then(categories => {
        res.render('index', { articles: category.articles, categories: categories })
      })
      
    } else {
      res.redirect('/')
    }
  }).catch(erro => {
    res.redirect('/')
  })
})

app.listen(3000, () => {
  console.log('O server está rodando')
})