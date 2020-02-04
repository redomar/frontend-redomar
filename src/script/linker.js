// Links used in navigation
// Auther: Redomar <Mohamed Omar>
// Date: 04/02/2020

let name_list = []
let link_list = []

// Function to collect json data
const getLinks = async () => {
  await fetch('/src/assets/links.json')
    .then(res => {
      return res.json()
    })
    .then(data => {
      name_list = names(data)
      link_list = links(data)
      return data
    })
}

// Autorun
;(async () => {
  await getLinks()

  for (i = 0; i < name_list.length; i++) {
    let navigation = document.getElementById('mySidenav')
    let anchor = document.createElement('a')
    let name = capitalise(name_list[i])

    anchor.setAttribute('href', link_list[i])
    navigation.appendChild(anchor).innerHTML = name
  }
})()

/* GETTERS AND SETTERS */

// Get links
const links = links => {
  return skel_in_func(links, 'link')
}

// Get names
const names = links => {
  return skel_in_func(links, 'name')
}

// Set to Capital
const capitalise = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Function to parse json file
const skel_in_func = (links, type) => {
  let arr = []
  links['links'].forEach(linkElement => {
    arr.push(linkElement[type])
  })
  return arr
}
