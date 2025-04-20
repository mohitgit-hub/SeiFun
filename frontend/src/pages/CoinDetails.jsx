import React from 'react'
import CryptoTradePanel from '../components/CoinDetails/CryptoTradePanel'
import { useLocation } from 'react-router-dom'
import CoinTransactionTable from '@/components/Transaction/CoinTransactionTable'

export default function CoinDetails() {
    const { state } = useLocation()
    if (!state) {
        return <div className="text-white">No coin data passed.</div>
    }

    return (
        <div>
            <CryptoTradePanel coinData={state} />
            <CoinTransactionTable coinData={state} />
        </div>
    )
}
