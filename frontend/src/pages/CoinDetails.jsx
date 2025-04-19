import React from 'react'
import CryptoTradePanel from '../components/CoinDetails/CryptoTradePanel'
import TransactionList from '../components/Transaction/TransactionList'
export default function CoinDetails() {
    return (
        <div>
            <CryptoTradePanel />
            <TransactionList />
        </div>
    )
}
