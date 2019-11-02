const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const app = express()

const port = 3000

// Import Routes
const authRoute = require('./routes/auth')

// Lookup environment variables
env.config()

// Connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected to MongoDB')
)

// Middlewears
app.use(express.json())

// Route Middlewears
app.use('/api/user', authRoute)

app.listen(port, () => console.log(`Server runneing ${port}`))
