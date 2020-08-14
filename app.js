const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateUrl = require('./generateUrl')
const Url = require("./models/url")

const app = express()
const port = 3000
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/url', async (req, res) => {
  const originalUrl = req.body.originalUrl
  const shortUrl = await generateUrl()
  console.log(originalUrl, shortUrl)
  Url.create({ originalUrl: originalUrl, shortUrl: shortUrl })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('Running server')
})
