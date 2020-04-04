const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', e => {
  let messages = []
  if (email.value === '' || email.value == null) {
    messages.push('An email is required')
  }
  if (password.value === '' || password.value == null) {
    messages.push('A password is required')
  } else if (password.value.length <= 5) {
    messages.push('Password must be longer')
  }
  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join('\n')
  }
  e.preventDefault()
})

function submitInfo () {
  let fd = new FormData(form)
  let data = {}
  for (let [key, prop] of fd) {
    data[key] = prop
  }
  VALUE = JSON.stringify(data, null, 2)
  console.log(VALUE)

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let failedResponse = false
  function status (response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json())
    } else {
      failedResponse = true
      return Promise.resolve(response.text())
    }
  }

  function json (response) {
    if (failedResponse) {
      try {
        errorElement.innerText = response.split(',').join('\n\n')
      } catch (error) {}
      return response
    } else {
      errorElement.innerText = ''
      return response.token
    }
  }

  fetch('http://redomar.co.uk:3300/api/user/login', {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: VALUE
  })
    .then(status)
    .then(json)
    .then(data => {
      console.log(data)
      localStorage.setItem('TOKEN', data)
      window.location.replace('list.html')
    })
    .catch(error => {
      console.log('Request failed', error)
    })
}
