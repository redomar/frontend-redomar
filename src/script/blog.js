// Api request
async function sendApiRequest (method, url, data) {
  const sendFetch = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: 'application/json',
      Auth_TOKEN: /** Token */ ''
    })
  })
  response = sendFetch.json()
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

async function postDelete (id) {
  const del = await sendApiRequest(
    'GET',
    `http://redomar.co.uk:3300/api/posts/delete/${id}`,
  )
  window.location.reload()
  if (del !== undefined) {
    return { _id: del._id, title: del.title }
  }
}

// Prerender : check if there is a post or now
async function renderPosts () {
  let posts = await getPosts()
  let deletebtn = true
  if (posts[0] == null) {
    fetch('/src/assets/sample-posts.json')
      .then(response => {
        deletebtn = false
        return response.json()
      })
      .then(data => {
        console.log(data)
        actualRenderer(data)
      })
  }
  actualRenderer(posts, deletebtn)
}

// Render posts into HTML format
function actualRenderer (posts, deletebtn) {
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
    ${deleteButton(deletebtn, post._id)}</span>`
  })
}

// TODO: Implement delete button to show to only logged in users
function deleteButton (deleteBool, postid) {
  var d = deleteBool
  if (d == true) {
    return (
      '<a href="javascript:postDelete(\'' +
      postid +
      '\')" class="button btn-del" )">Delete</a>'
    )
  } else {
    return ''
  }
}

renderPosts()
