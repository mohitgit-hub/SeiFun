import React, { useState } from 'react'
import { ethers } from 'ethers'
import PriceChart from './PriceChart'
import TradeButtonCombo from './TradeButtonCombo'

import tokenAbi from '../../constants/token.json'
import marketplaceAbi from '../../constants/marketplace.json'

const CryptoTradePanel = ({ coinData }) => {
    const [amount, setAmount] = useState('')
    const [status, setStatus] = useState('')

    const handleBuy = async () => {
        try {
            if (!window.ethereum || !coinData?.marketplace) return
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            const marketplace = new ethers.Contract(
                coinData.marketplace, // ← dynamically passed
                marketplaceAbi,
                signer
            )

            const tx = await marketplace.buyTokens({
                value: ethers.utils.parseEther(amount), // amount in SEI
            })

            await tx.wait()
            setStatus(`✅ Bought ${amount} ${coinData?.ticker}`)
        } catch (err) {
            console.error(err)
            setStatus('❌ Buy failed')
        }
    }

    const handleSell = async () => {
        try {
            if (!window.ethereum || !coinData) return
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            const token = new ethers.Contract(coinData.token, tokenAbi, signer)
            const marketplace = new ethers.Contract(coinData.marketplace, marketplaceAbi, signer)

            const parsedAmount = ethers.utils.parseUnits(amount, 18)

            // 1. Approve tokens
            const approveTx = await token.approve(coinData.marketplace, parsedAmount)
            await approveTx.wait()

            // 2. Call sell function
            const sellTx = await marketplace.sellTokens(parsedAmount)
            await sellTx.wait()

            setStatus(`✅ Sold ${amount} ${coinData?.ticker}`)
        } catch (err) {
            console.error(err)
            setStatus('❌ Sell failed')
        }
    }

    return (
        <div className="max-w-[1200px] mx-auto  text-white p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <PriceChart />
                <div className="flex flex-col gap-4">
                    <TradeButtonCombo
                        setAmount={setAmount}
                        handleBuy={handleBuy}
                        handleSell={handleSell}
                        amount={amount}
                        coinData={coinData}
                    />
                    {status && <p className="text-center text-yellow-300 font-medium">{status}</p>}
                </div>
            </div>
        </div>
    )
}

export default CryptoTradePanel
