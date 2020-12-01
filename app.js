const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

// Load config
dotenv.config({ path: './config/config.env'})

// Apply body
app.use(bodyParser.json())
app.use(express.json())

// Import routes
const authRoute = require('./routes/auth')
app.use('/notes', require('./routes/notes'))

//Route middleware
app.use('/api/user', authRoute)

// Routes landing page
app.get('/', (req, res) => {
  res.send('login page')
})

// Logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// Connect db
connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT)