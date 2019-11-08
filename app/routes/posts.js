const router = require('express').Router()
const verify = require('../controllers/verifyToken')
const User = require('../models/user')
const Post = require('../models/post')
const { newPostValidation } = require('../models/validation')

// Get posts from Database - Valid tokens only
router.get('/', verify, async (req, res) => {
  // Validate user token
  try {
    userDB = await User.findOne({ _id: req.user })
    if (!userDB) throw 'Token user not found'
  } catch (error) {
    return res.status(401).json({ error: error })
  }

  // Return all posts -- Id, and V values not returned
  const posts = await Post.find({}, { _id: 0, __v: 0 })
  res.send(posts)
})

// Post new Posts
router.post('/new', verify, async (req, res) => {
  // Validate incoming user input
  const { error } = newPostValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Validate user exists
  const userExists = await User.findOne({ name: req.body.username })
  if (!userExists) {
    return res.status(400).send('User not found')
  }

  // Compare user to given token, Must be a the specific token for that user
  // And Verify Token
  try {
    userDB = await User.findOne({ _id: req.user })
    if (!userDB) throw 'Token user not found'
    if (userDB.name != req.body.username) {
      throw 'Token User not posting'
    }
  } catch (error) {
    return res.status(401).json({ error: error })
  }

  // Create new Post on Database
  const post = new Post({
    title: req.body.title,
    username: req.body.username,
    content: req.body.content
  })

  // Return data from database to confirm success (!Implemented)
  try {
    const savedPost = await post.save()
    res.send({
      post_id: post._id,
      title: post.title,
      content: post.content
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

// Search for post via title /MUST BE EXACT/
router.get('/search/:title', verify, async (req, res) => {
  try {
    const findPost = await Post.findOne({ title: req.params.title })
    if (findPost == null) throw `<b>Post Not found:</b> ${req.params.title}`
    res.send(findPost)
    console.log(findPost)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete post
router.get('/delete/:postId', verify, async (req, res) => {
  try {
    const deletePost = await Post.findById(req.params.postId)
    await Post.remove({
      _id: req.params.postId
    })
    res.send(deletePost)
  } catch (error) {
    res.status(400).send(`<h1> ${error.message} <h1/>`)
  }
})

// Update post by ID
router.get('/update/:postId/:change', verify, async (req, res) => {
  try {
    await Post.update(
      {
        _id: req.params.postId
      },
      { $set: { title: req.params.change } }
    )
    const updatedPost = await Post.findById(req.params.postId)
    res.send(updatedPost)
  } catch (error) {
    res.status(400).send(`<h1> ${error.message} <h1/>`)
  }
})

module.exports = router
