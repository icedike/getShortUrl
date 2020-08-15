const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateUrl = require('./generateUrl')
const Url = require('./models/url')

const app = express()
const port = process.env.PORT || 3000
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
  const originalUrl = req.body.originalUrl
  const shortUrl = await generateUrl()
  Url.create({ originalUrl: originalUrl, shortUrl: shortUrl })
    .then(() => res.render('index', { originalUrl, shortUrl: req.protocol + '://' + req.get('host') + '/' + shortUrl }))
    .catch(error => console.log(error))
})

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  Url.findOne({ shortUrl: shortUrl })
    .then(function (result) {
      if (result) {
        res.redirect(result.originalUrl)
      } else {
        res.render('index', { urlNotExist: true })
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('Running server')
})
