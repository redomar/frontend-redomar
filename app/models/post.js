const mongoose = require('mongoose')

// Model requirements for posts
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 128
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  content: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 4096
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Post', postSchema)
