
const Url = require('./models/url')

function generateCode() {
  let urlCode = ''
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const code = (lowerCaseLetters + upperCaseLetters + numbers).split('')

  for (let i = 0; i < 5; i++) {
    urlCode += code[Math.floor(Math.random() * code.length)]
  }

  return urlCode
}

async function generateUrl() {
  let urlExist = true
  let urlCode = ''
  console.log('start')
  while (urlExist) {
    urlCode = await generateCode()
    // check short url
    await Url.exists({ shortUrl: urlCode })
      .then(function (result) {
        urlExist = result
      })
      .catch(error => console.log(error))
  }

  return urlCode
}

module.exports = generateUrl
