import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import marketplaceAbi from '../../constants/marketplace.json'

export default function TradeButtonCombo({ handleBuy, handleSell, setAmount, amount, coinData }) {
    const [calculatedPrice, setCalculatedPrice] = useState(null)

    useEffect(() => {
        const fetchPrice = async () => {
            if (!window.ethereum || !coinData?.marketplace || !amount) {
                setCalculatedPrice(null)
                return
            }

            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const contract = new ethers.Contract(coinData.marketplace, marketplaceAbi, provider)

                const parsedAmount = ethers.utils.parseUnits(amount, 18)
                const price = await contract.calculatePrice(parsedAmount)
                setCalculatedPrice(ethers.utils.formatEther(price))
            } catch (err) {
                console.error('Price fetch error:', err)
                setCalculatedPrice(null)
            }
        }

        fetchPrice()
    }, [amount, coinData?.marketplace])

    return (
        <div className="bg-darkGray rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Trade {coinData?.tokenName} ({coinData?.ticker})
            </h2>

            {/* Token Details */}
            <div className="mb-4 text-sm text-gray-300 space-y-1">
                <p>
                    <span className="font-semibold text-white">Token Address:</span>{' '}
                    {coinData?.token}
                </p>
                <p>
                    <span className="font-semibold text-white">Creator:</span> {coinData?.creator}
                </p>
                <p>
                    <span className="font-semibold text-white">Created At:</span>{' '}
                    {coinData?.createdAt}
                </p>
                <p>
                    <span className="font-semibold text-white">Marketplace:</span>{' '}
                    {coinData?.marketplace}
                </p>
                <p>
                    <span className="font-semibold text-white">Description:</span>{' '}
                    {coinData?.description}
                </p>
                {coinData?.x_link && (
                    <p>
                        <span className="font-semibold text-white">Twitter:</span>{' '}
                        <a
                            href={coinData.x_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                        >
                            {coinData.x_link}
                        </a>
                    </p>
                )}
                {coinData?.tele_link && (
                    <p>
                        <span className="font-semibold text-white">Telegram:</span>{' '}
                        <a
                            href={coinData.tele_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                        >
                            {coinData.tele_link}
                        </a>
                    </p>
                )}
                {coinData?.website_link && (
                    <p>
                        <span className="font-semibold text-white">Website:</span>{' '}
                        <a
                            href={coinData.website_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                        >
                            {coinData.website_link}
                        </a>
                    </p>
                )}
            </div>

            {/* Trade Input + Buttons */}
            <div className="flex flex-col gap-4">
                <label htmlFor="amount" className="text-sm text-gray-300">
                    Amount (in {coinData?.ticker || '$MEME'})
                </label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-[#1f1f1f] text-white border border-gray-600 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition duration-200"
                />
                {/* estimated cost (dynamically converts your token pricce into SEI) */}

                {calculatedPrice && (
                    <p className="text-green-400 text-sm">Estimated cost: {calculatedPrice} SEI</p>
                )}

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
