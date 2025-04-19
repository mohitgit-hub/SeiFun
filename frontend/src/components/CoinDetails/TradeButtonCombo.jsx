import React from 'react'

export default function TradeButtonCombo({ handleBuy, handleSell, setAmount, amount }) {
    return (
        <div className="bg-darkGray rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-4 text-center">Trade MEME Coin</h2>

            <div className="flex flex-col gap-4">
                <label htmlFor="amount" className="text-sm text-gray-300">
                    Amount (in $MEME)
                </label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-darkGray text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleBuy}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition"
                    >
                        Buy
                    </button>
                    <button
                        onClick={handleSell}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
                    >
                        Sell
                    </button>
                </div>
            </div>
        </div>
    )
}
