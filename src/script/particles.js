if (screen.width >= 450) {
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', 'assets/particles.json', function () {
    console.log('callback - particles.js config loaded')
    document.getElementById('particles-js').style.visibility = 'visible'
    document.getElementById('location').style.filter = 'invert()'
    document.getElementById('full-name').style.filter = 'invert()'
  })
}
