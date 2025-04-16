import express from 'express'
// import multer from 'multer'
import cors from 'cors'

import connectDatabase from './config/connectDatabase.js'
import CoinModel from './models/coin.Model.js'

const app = express()

app.use(express.json())
app.use(cors())

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     },
// })

// const upload = multer({ storage })

app.post('/createCoin', async (req, res) => {
    try {
        const { name, ticker, description, image } = req.body

        if (!name || !ticker || !description || !image) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const newCoin = new CoinModel({
            coin_name: name,
            ticker,
            description,
            path: image, // 'path' holds the Cloudinary URL
        })

        await newCoin.save()
        res.status(201).json({ message: 'Coin created successfully', coin: newCoin })
    } catch (error) {
        console.error('Error creating coin:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get('/getCoins', async (req, res) => {
    try {
        const coins = await CoinModel.find()
        res.status(200).json(coins)
    } catch (error) {
        console.error('Error fetching coins:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

//configuring environment variables here and giving the path using path module
// dotenv.config({ path: path.join(__dirname, 'config/config.env') })

app.listen(5000, async () => {
    await connectDatabase()
    console.log('Server started on port 5000')
})
