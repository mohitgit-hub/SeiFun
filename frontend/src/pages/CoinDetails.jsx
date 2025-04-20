import React from 'react'
import CryptoTradePanel from '../components/CoinDetails/CryptoTradePanel'
import TransactionList from '../components/Transaction/TransactionList'
import { useLocation } from 'react-router-dom'

export default function CoinDetails() {
    const { state } = useLocation()
    if (!state) {
        return <div className="text-white">No coin data passed.</div>
    }

    return (
        <div>
            <CryptoTradePanel coinData={state} />
            <TransactionList coinData={state} />
        </div>
    )
}
