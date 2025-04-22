import React, { useEffect, useState } from 'react'
import Loader from '../ui/Loader'

const UserTransactionTable = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const formatCompactNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'
        if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
        if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
        return num.toString()
    }

    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                userId: 101,
                coin: 'Bitcoin',
                type: 'buy',
                quantity: 0.005,
                price: 3000000,
                timestamp: '2025-04-15T12:30:00Z',
            },
            {
                id: 2,
                userId: 102,
                coin: 'Ethereum',
                type: 'sell',
                quantity: 0.1,
                price: 180000,
                timestamp: '2025-04-14T09:15:00Z',
            },
            {
                id: 3,
                userId: 103,
                coin: 'Solana',
                type: 'buy',
                quantity: 50,
                price: 8000,
                timestamp: '2025-04-13T16:45:00Z',
            },
            {
                id: 4,
                userId: 104,
                coin: 'Ripple',
                type: 'sell',
                quantity: 500,
                price: 55,
                timestamp: '2025-04-12T11:00:00Z',
            },
            {
                id: 5,
                userId: 105,
                coin: 'Cardano',
                type: 'buy',
                quantity: 1000,
                price: 45,
                timestamp: '2025-04-11T13:30:00Z',
            },
            {
                id: 6,
                userId: 106,
                coin: 'Bitcoin',
                type: 'sell',
                quantity: 0.01,
                price: 3100000,
                timestamp: '2025-04-10T17:45:00Z',
            },
            {
                id: 7,
                userId: 107,
                coin: 'Ethereum',
                type: 'buy',
                quantity: 0.3,
                price: 175000,
                timestamp: '2025-04-09T10:15:00Z',
            },
            {
                id: 8,
                userId: 108,
                coin: 'Solana',
                type: 'sell',
                quantity: 60,
                price: 7800,
                timestamp: '2025-04-08T19:50:00Z',
            },
            {
                id: 9,
                userId: 109,
                coin: 'Dogecoin',
                type: 'buy',
                quantity: 10000,
                price: 9,
                timestamp: '2025-04-07T14:05:00Z',
            },
            {
                id: 10,
                userId: 110,
                coin: 'Litecoin',
                type: 'sell',
                quantity: 10,
                price: 10500,
                timestamp: '2025-04-06T08:40:00Z',
            },
            {
                id: 11,
                userId: 111,
                coin: 'Polygon',
                type: 'buy',
                quantity: 300,
                price: 95,
                timestamp: '2025-04-05T16:10:00Z',
            },
            {
                id: 12,
                userId: 112,
                coin: 'Bitcoin',
                type: 'buy',
                quantity: 0.015,
                price: 2950000,
                timestamp: '2025-04-04T12:25:00Z',
            },
            {
                id: 13,
                userId: 113,
                coin: 'Ethereum',
                type: 'sell',
                quantity: 0.25,
                price: 185000,
                timestamp: '2025-04-03T18:35:00Z',
            },
            {
                id: 14,
                userId: 114,
                coin: 'Solana',
                type: 'buy',
                quantity: 75,
                price: 8100,
                timestamp: '2025-04-02T11:50:00Z',
            },
            {
                id: 15,
                userId: 115,
                coin: 'Dogecoin',
                type: 'sell',
                quantity: 20000,
                price: 8.5,
                timestamp: '2025-04-01T13:00:00Z',
            },
            {
                id: 16,
                userId: 116,
                coin: 'Ripple',
                type: 'buy',
                quantity: 1000,
                price: 52,
                timestamp: '2025-03-31T09:45:00Z',
            },
            {
                id: 17,
                userId: 117,
                coin: 'Litecoin',
                type: 'buy',
                quantity: 5,
                price: 10200,
                timestamp: '2025-03-30T20:10:00Z',
            },
            {
                id: 18,
                userId: 118,
                coin: 'Cardano',
                type: 'sell',
                quantity: 1500,
                price: 48,
                timestamp: '2025-03-29T15:20:00Z',
            },
        ]

        setTransactions(sampleData)
        setLoading(false)
    }, [])

    if (loading) return <Loader />

    return (
        <div className="max-w-[1200px] mx-auto p-4 min-h-screen">
            <h2 className="text-2xl tracking-wider text-center font-bold mb-2    text-gray-900 dark:text-white">
                User Transaction History
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
                *Note: This table is under construction, data you may see will not be correct
            </p>
            <div className="overflow-x-auto rounded-md">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-100 dark:bg-darkGray text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">User ID</th>
                            <th className="px-4 py-3">Coin</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Quantity</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr
                                key={txn.id}
                                className="bg-white dark:bg-darkGray border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <td className="px-4 py-2">{txn.id}</td>
                                <td className="px-4 py-2">{txn.userId}</td>
                                <td className="px-4 py-2">{txn.coin}</td>
                                <td className="px-4 py-2 capitalize">
                                    <span
                                        className={`text-md font-semibold tracking-wider ${
                                            txn.type === 'buy' ? 'text-green-700' : 'text-red-700'
                                        }`}
                                    >
                                        {txn.type}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{txn.quantity}</td>
                                <td className="px-4 py-2 tracking-wider">
                                    ₹{formatCompactNumber(txn.price)}
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(txn.timestamp).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserTransactionTable
