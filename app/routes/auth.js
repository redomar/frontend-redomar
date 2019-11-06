const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('../controllers/verifyToken')
const { registerValidation, loginValidation } = require('../models/validation')

// Route register
router.post('/register', async (req, res) => {
  // Validate incoming data
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Lookup for existing users
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    return res
      .status(400)
      .send(`Email ${req.body.email} already exists, please sign in instead`)
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    res.send({
      user_id: user._id,
      email: user.email
    })
  } catch (error) {
    res.statusCode(400).send(error)
  }
})

// Show users lists -- [DEBUG-ONLY] !MUST REMOVE BEOFRE LAUNCH!
router.get('/list', verify, async (req, res) => {
  users = await User.find({}, { _id: 0, name: 1, email: 1 })
  res.send(users)
})

// Login
router.post('/login', async (req, res) => {
  // Validate incoming request
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Lookup for existing users
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res
      .status(400)
      .send(
        `Email ${req.body.email} does not exists, please register in instead`
      )
  }

  // Validate Password
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid Password')

  // Tokenise session
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth_TOKEN', token).json({
    token: token,
    name: user.name,
    message: `Success, Welcome back ${user.name}!`
  })
})

module.exports = router
