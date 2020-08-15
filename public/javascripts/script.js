const urlForm = document.querySelector('#urlForm')
const submitBtn = document.querySelector('#submitBtn')
const originalUrl = document.querySelector('#originalUrl')

// check empty input
submitBtn.addEventListener('click', event => {
  console.log('btn click')
  const url = originalUrl.value.trim()
  if (!url.length) alert('請輸入網址')
  else urlForm.submit()
})
