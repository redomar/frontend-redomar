const fetchItems = async () => {
  // Try to reach server
  let data
  try {
    data = await fetch('http://redomar.co.uk:3300/api/posts')
  } catch (error) {
    dummyText()
    console.log(`Server API unreachable: \n${error}`)
  }
  const items = await data.json()
  console.log(items)

  // Display Posts from server API
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    let selection = document.getElementById('blog')
    let newArticle = document.createElement('article')
    newArticle.setAttribute('id', 'art' + i)
    selection.appendChild(newArticle).innerHTML = `<h3>${
      items[i].title
    }</h3><p>${items[i].content}</p><span class="date">
    <p>${new Date(items[i].date).toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'medium',
      timeStyle: 'short'
    })}</p><span class="username">
    <p>${items[i].username}</p>
    <a class="button btn-del" href="http://redomar.co.uk:3300/api/posts/delete/${
      items[i]._id
    }">Delete</a></span>`
  }
}

// Throw Lorem Ipsum into DOM
const dummyText = () => {
  for (let i = 1; i <= 3; i++) {
    let selection = document.getElementById('blog')
    let newArticle = document.createElement('article')
    newArticle.setAttribute('id', 'art' + 'ipsom')
    selection.appendChild(
      newArticle
    ).innerHTML = `<h3>Post ${i}</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae autem libero commodi quis nisi facilis eaque veniam. Veritatis atque, tempore dolorem, pariatur adipisci ab debitis explicabo soluta ullam quaerat dicta.</p><p>Necessitatibus, hic? Asperiores maiores voluptate deleniti natus similique, itaque odit dolore eum totam numquam odio mollitia sapiente optio nostrum, obcaecati alias eligendi, maxime quidem fugiat? Nostrum ut repellat laudantium ducimus?</p>
    <span class="date"><p>01/01/20</p>
    <span class="username"><p>name</p></span>`
  }
  document.getElementById('server-fail').hidden = false
  document.getElementById('new-btn').hidden = true
}

fetchItems()
