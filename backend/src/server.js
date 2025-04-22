import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDatabase from './config/connectDatabase.js'
import coinRoutes from './routes/coinRoutes.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Backend is running!!')
})

// Routes
app.use('/api/coin', coinRoutes)

const PORT = 5000

app.listen(PORT, async () => {
    await connectDatabase()
    console.log('Server started on port 5000')
})
