const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const connectDatabase = require('./config/connectDatabase')

//getting the express object to work with its functions..
const app = express()

//basic importing stuffs and using express.json() to work with json formated files
app.use(express.json())

//configuring environment variables here and giving the path using path module
dotenv.config({ path: path.join(__dirname, 'config/config.env') })