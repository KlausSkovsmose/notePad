const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

const app = express()

// Load config
dotenv.config({ path: './config/config.env'})

// Apply body parser
app.use(bodyParser.json())

// Import routes
app.use('/notes', require('./routes/notes'))

// Routes landing page
app.get('/', (req, res) => {
  res.send('login page')
})

// Logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT)