const fetchItems = async () => {
  const data = await fetch('http://localhost:3300/api/posts')
  const items = await data.json()
  console.log(items)

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    var selection = document.getElementById('blog')
    var newArticle = document.createElement('article')
    newArticle.setAttribute('id', 'art' + i)
    selection.appendChild(newArticle).innerHTML = `<h3>${
      items[i].title
    }</h3><p>${items[i].content}</p><span class="date">
    <p>${items[i].date}</p><span class="username">
    <p>${items[i].username}</p>
  </span>`
  }
}
fetchItems()
