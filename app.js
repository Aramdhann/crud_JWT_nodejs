import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import { URI, PORT } from './config/index.js'
import Router from './routes/index.js'
import mongoose, { mongo } from 'mongoose'

// create express app
const app = express()

// parse cookies
app.use(cookieParser())

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// enable cors
app.use(cors())

// connect to mongodb
mongoose
  .connect(URI)
  .then(console.log('Connected to MongoDB'))
  .catch((error) => {
    console.log('Failed to connect mongodb: ', error)
  })

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

// routes
Router(app)
