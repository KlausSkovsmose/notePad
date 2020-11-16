const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const { request } = require('express')
const http = require('http')
const fs = require('fs')


// Load config
dotenv.config({ path: './config/config.env'})

connectDB()

const app = express()

// Logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// Read html file

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))