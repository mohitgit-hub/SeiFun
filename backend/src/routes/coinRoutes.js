import express from 'express'
import { createCoin, getCoins } from '../controllers/coinController.js'

const router = express.Router()

router.post('/createCoin', createCoin)
router.get('/getCoins', getCoins)

export default router
