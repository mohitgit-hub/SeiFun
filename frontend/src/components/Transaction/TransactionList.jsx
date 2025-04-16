import React, { useEffect, useState } from 'react'
import Loader from '../Loader'

const TransactionList = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate API call with sample data
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
        ]

        // Mimic network delay
        setTimeout(() => {
            setTransactions(sampleData)
            setLoading(false)
        }, 1000)
    }, [])

    if (loading) return <Loader />

    return (
        <div className="max-w-4xl mx-auto p-4 min-h-screen ">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Transaction History
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
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
                                className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                            >
                                <td className="px-4 py-2">{txn.id}</td>
                                <td className="px-4 py-2">{txn.userId}</td>
                                <td className="px-4 py-2">{txn.coin}</td>
                                <td className="px-4 py-2 capitalize">{txn.type}</td>
                                <td className="px-4 py-2">{txn.quantity}</td>
                                <td className="px-4 py-2">₹{txn.price.toLocaleString()}</td>
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

export default TransactionList
