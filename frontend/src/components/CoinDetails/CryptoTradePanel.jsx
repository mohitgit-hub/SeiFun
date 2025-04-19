import React, { useState } from 'react'
import PriceChart from './PriceChart'
import TradeButtonCombo from './TradeButtonCombo'

const CryptoTradePanel = () => {
    const [amount, setAmount] = useState('')

    const handleBuy = () => {
        alert(`Buying ${amount} $MEME`)
    }

    const handleSell = () => {
        alert(`Selling ${amount} $MEME`)
    }

    return (
        <div className="max-w-[1200px] mx-auto  text-white p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <PriceChart />
                <TradeButtonCombo
                    setAmount={setAmount}
                    handleBuy={handleBuy}
                    handleSell={handleSell}
                    amount={amount}
                />
            </div>
        </div>
    )
}

export default CryptoTradePanel
