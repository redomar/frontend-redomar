const router = require('express').Router()
const verify = require('../controllers/verifyToken')
const User = require('../models/user')

router.get('/', verify, async (req, res) => {
  try {
    userDB = await User.findOne({ _id: req.user })
    if (!userDB) throw 'Token user not found'
  } catch (error) {
    return res.status(401).json({ error: error })
  }

  res.json({
    posts: { title: 'test title', body: 'content', user: userDB }
  })
})

module.exports = router
