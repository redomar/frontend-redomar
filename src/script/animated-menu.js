function openNav () {
  /* If the screen is small then stack nav vertically */
  if (screen.width >= 450) {
    document.getElementById('mySidenav').style.height = '50px'
    document.getElementById('mySidenav').style.flexDirection = 'row'
  } else {
    document.getElementById('mySidenav').style.height = '200px'
    document.getElementById('mySidenav').style.alignItems = 'center'
    document.getElementById('mySidenav').style.flexDirection = 'column'
  }
}

/* Set the width of the side navigation to 0 */
function closeNav () {
  document.getElementById('mySidenav').style.height = '0px'
}
