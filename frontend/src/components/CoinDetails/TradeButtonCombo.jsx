import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import marketplaceAbi from '../../constants/marketplace.json'
import { FaRegCopy } from 'react-icons/fa'

const formatAddress = (addr) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleString()
}

export default function TradeButtonCombo({ handleBuy, handleSell, setAmount, amount, coinData }) {
    const [copied, setCopied] = useState(null)

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text)
        setCopied(label)
        setTimeout(() => setCopied(null), 1500)
    }
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
        <div className="bg-darkGray rounded-2xl px-12 py-6 mx-auto shadow-xl flex flex-col justify-around">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Trade {coinData?.tokenName} ({coinData?.ticker})
            </h2>

            <div className="mb-4 text-sm text-gray-300 space-y-2 font-montserrat">
                <div className="grid grid-cols-2 items-center">
                    <span className="text-white font-semibold">Token Address:</span>
                    <span className="flex items-center gap-2">
                        {formatAddress(coinData?.token)}
                        <FaRegCopy
                            className="cursor-pointer hover:text-white"
                            onClick={() => handleCopy(coinData?.token, 'token')}
                        />
                        {copied === 'token' && (
                            <span className="text-green-400 text-xs">Copied!</span>
                        )}
                    </span>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <span className="text-white font-semibold">Creator:</span>
                    <span className="flex items-center gap-2">
                        {formatAddress(coinData?.creator)}
                        <FaRegCopy
                            className="cursor-pointer hover:text-white"
                            onClick={() => handleCopy(coinData?.creator, 'creator')}
                        />
                        {copied === 'creator' && (
                            <span className="text-green-400 text-xs">Copied!</span>
                        )}
                    </span>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <span className="text-white font-semibold">Created At:</span>
                    <span>{formatDate(coinData?.createdAt)}</span>
                </div>
                <div className="grid grid-cols-2 items-center">
                    <span className="text-white font-semibold">Marketplace:</span>
                    <span className="flex items-center gap-2">
                        {formatAddress(coinData?.marketplace)}
                        <FaRegCopy
                            className="cursor-pointer hover:text-white"
                            onClick={() => handleCopy(coinData?.marketplace, 'marketplace')}
                        />
                        {copied === 'marketplace' && (
                            <span className="text-green-400 text-xs">Copied!</span>
                        )}
                    </span>
                </div>
                <div className="grid grid-cols-2 items-start">
                    <span className="text-white font-semibold">Description:</span>
                    <span className="text-gray-300">{coinData?.description}</span>
                </div>
            </div>

            {/* Trade Input + Buttons */}
            <div className="flex flex-col gap-4">
                <input
                    id="amount"
                    type="number"
                    placeholder="Enter amount in SEI"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-[#1f1f1f] text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-500 transition duration-200"
                />
                {/* estimated cost (dynamically converts your token pricce into SEI) */}

                {calculatedPrice && (
                    <p className="text-green-400 text-sm">
                        Expected: {calculatedPrice} {coinData.ticker}
                    </p>
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
