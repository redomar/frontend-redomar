const jwt = require('jsonwebtoken')

// Verify valid token
module.exports = function (req, res, next) {
  // Look up if token exists
  const token = req.header('auth_TOKEN')
  if (!token) return res.status(401).send('Unauthorised Access Detected')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}
