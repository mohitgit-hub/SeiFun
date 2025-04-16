// src/components/HackathonLists.js
import React, { useEffect, useState } from 'react'
import MemeCoinCard from './MemeCoinCard'
import axios from 'axios'
import GlowButton from './GlowButton'
import { useSelector } from 'react-redux'
import Loader from './Loader'

export default function MemeCoinLists() {
    const [memeCoins, setMemeCoins] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const searchQuery = useSelector((state) => state.search.query) // Get the search query from Redux

    const fetchMemeCoins = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/coin/getCoins')
            const data = await response.data
            console.log('Fetched meme coins:', data)
            return data
        } catch (error) {
            console.error('Error fetching meme coins:', error)
            return []
        }
    }

    useEffect(() => {
        const getCoins = async () => {
            const data = await fetchMemeCoins()
            setMemeCoins(data)
            setIsFetching(false) // Set fetching to false after data is fetched
        }
        getCoins()
    }, [])

    // Filter memeCoins based on the search query
    const filteredMemeCoins = searchQuery
        ? memeCoins.filter(
              (coin) =>
                  coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  coin.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  coin.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : memeCoins

    return (
        <div className="text-white max-w-[1200px] mx-auto min-h-screen">
            <div className="my-4 flex space-x-4">
                <GlowButton path="/" text="Existing Meme Coin" />
                <GlowButton path="/transactions" text="My Transactions" />
                <GlowButton path="/feedback" text="Give Feedback" />
            </div>

            <div className="flex flex-wrap gap-8 justify-center max-w-[1200px] mx-auto">
                {isFetching ? (
                    <Loader />
                ) : (
                    filteredMemeCoins.map((event, index) => (
                        <MemeCoinCard
                            key={index}
                            createdAt={event.createdAt}
                            tokenName={event.coin_name}
                            ticker={event.ticker}
                            description={event.description}
                            imageUrl={event.path} // Fallback image
                        />
                    ))
                )}
            </div>
        </div>
    )
}
