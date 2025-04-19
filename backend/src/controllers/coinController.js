import CoinModel from '../models/coinModel.js'

export const createCoin = async (req, res) => {
    try {
        const { id, description, path, x_link, tele_link, website_link } = req.body

        if (!description || !path) {
            return res.status(400).json({ message: 'Description and image are required' })
        }

        const newCoin = new CoinModel({
            id,
            description,
            path,
            x_link,
            tele_link,
            website_link,
        })

        await newCoin.save()
        res.status(201).json({ message: 'Coin created successfully', coin: newCoin })
    } catch (error) {
        console.error('Error creating coin:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getCoins = async (req, res) => {
    try {
        const coins = await CoinModel.find()
        res.status(200).json(coins)
    } catch (error) {
        console.error('Error fetching coins:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
