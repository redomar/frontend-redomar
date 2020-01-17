async function sendApiRequest (method, url, data) {
  const sendFetch = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'Application/json' } : {}
  })
  const response = await sendFetch.json()
  const token = await sendFetch.token
  console.log(token)
  return response
}

// Get Posts using Fetch function
async function getPosts () {
  const posts = await sendApiRequest(
    'GET',
    'http://redomar.co.uk:3300/api/posts'
  )
  return posts
}

/*async function postDelete (id) {
  const del = await sendApiRequest(
    'GET',
    `http://redomar.co.uk:3300/api/posts/delete/${id}`,
    del.token
  )
  return del
}*/

async function renderPosts () {
  posts = await getPosts()
  posts.forEach(post => {
    let selection = document.getElementById('blog')
    let newArticle = document.createElement('article')
    newArticle.setAttribute('id', post._id.substring(13, 18))
    selection.appendChild(newArticle).innerHTML = `<h3>${post.title}</h3><p>${
      post.content
    }</p><span class="date">
    <p>${new Date(post.date).toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'medium',
      timeStyle: 'short'
    })}</p><span class="username">
    <p>${post.username}</p>
    <a class="button btn-del")">Delete</a></span>`
  })
}

renderPosts()
