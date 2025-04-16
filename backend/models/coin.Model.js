//Meme coin creation model code import mongoose from 'mongoose'
import mongoose from 'mongoose'
const coinSchema = mongoose.Schema({
    coin_name: { type: String, required: true },
    ticker: { type: String, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const CoinModel = mongoose.model('Coins', coinSchema)

export default CoinModel
