const router = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../model/validation')

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

  res.send(`Success, Welcome back ${user.name}!`)
})

module.exports = router
