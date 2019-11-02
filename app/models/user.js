const mongoose = require('mongoose')

// Model requirements for user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
