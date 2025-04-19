// src/components/HackathonLists.js
import React, { useEffect, useState } from 'react'
import MemeCoinCard from './MemeCoinCard'
import axios from 'axios'
import GlowButton from '../ui/GlowButton'
import { useSelector } from 'react-redux'
import Loader from '../ui/Loader'
import { ReactTyped } from 'react-typed'
import { fetchAllProjects } from '@/constants/factoryconfig.js'

export default function MemeCoinLists() {
    const [memeCoins, setMemeCoins] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const searchQuery = useSelector((state) => state.search.query) // Get the search query from Redux

    const fetchBackendCoins = async () => {
        try {
            const backendRes = await axios.get('http://localhost:5000/api/coin/getCoins')
            return backendRes.data // Returns the coins from MongoDB
        } catch (err) {
            console.error('Error fetching coins from backend:', err)
            return []
        }
    }
    const fetchChainData = async () => {
        const data = await fetchAllProjects()

        // Debug: Log raw contract data
        console.log('Fetched projects from contract:', data)

        // Format the raw on-chain project data (if needed)
        const formatted = data.map((coin) => ({
            coin_name: coin.name,
            ticker: coin.symbol,
            token: coin.token,
        }))

        return formatted
    }

    const mergeData = async () => {
        const backendCoins = await fetchBackendCoins() // Step 1: Get backend coins
        const onChainData = await fetchChainData() // Step 1: Get backend coins
        const enrichedCoins = []

        for (let coin of backendCoins) {
            const {
                token,
                marketplace,
                walletaddress,
                description,
                path,
                x_link,
                tele_link,
                website_link,
            } = coin // Token as the unique identifier

            //filter the token details from the onchain formatted data
            for (let onCoin of onChainData) {
                if (onCoin.token === token) {
                    enrichedCoins.push({
                        ...onCoin, // Merge on-chain details into backend coin
                        marketplace,
                        walletaddress,
                        description,
                        path,
                        x_link,
                        tele_link,
                        website_link,
                        createdAt: coin.createdAt,
                    })
                }
            }
        }

        return enrichedCoins
    }

    useEffect(() => {
        const initialFetch = async () => {
            setMemeCoins(await mergeData())
            setIsFetching(false)
        }

        initialFetch()
    }, [])

    // Filter memeCoins based on the search query
    const filteredMemeCoins = searchQuery
        ? memeCoins.filter(
              (coin) =>
                  coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  coin.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : memeCoins

    return (
        <div className="text-white max-w-[1200px] mx-auto min-h-screen">
            <div className="my-4 flex justify-between space-x-4 items-center border-b-2 border-gray-200 border-opacity-20 mb-12">
                <div className="flex space-x-4">
                    <GlowButton path="/" text="Existing Meme Coin" />
                    <GlowButton path="/transactions" text="My Transactions" />
                    <a href="/form.html" target="_blank" rel="noopener noreferrer">
                        <GlowButton text="Give Feedback" />
                    </a>
                </div>

                <div className="flex flex-col justify-center max-w-2xl">
                    <p className="flex-1 font-poppins text-center  font-bold pr-2">
                        <div className="text-4xl mr-2 mb-4">Deploy your Tokens With </div>
                        <div className="mb-4">
                            <span className="text-sky-500 text-xl">
                                OUR 💪ZERO CODE<span className="text-white"> Sei</span>.Fun Platform
                                -{' '}
                            </span>
                            <span className="text-xl">
                                <ReactTyped
                                    className="text-md text-center font-bold"
                                    strings={[
                                        'Easy😄 To Create😎',
                                        'AI🔭 Generation!🤞',
                                        'Faster⏩ Deployment',
                                        'Secure🔐 Deployment',
                                    ]}
                                    typeSpeed={30}
                                    backSpeed={30}
                                    loop
                                />
                            </span>
                        </div>
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-8 justify-center max-w-[1200px] mx-auto">
                {isFetching ? (
                    <Loader />
                ) : (
                    filteredMemeCoins.map((event, index) => (
                        <MemeCoinCard
                            key={index}
                            token={event.token}
                            createdAt={event.createdAt}
                            description={event.description}
                            imageUrl={event.path}
                            x_link={event.x_link}
                            tele_link={event.tele_link}
                            website_link={event.website_link}
                            tokenName={event.coin_name}
                            ticker={event.ticker}
                            creator={event.walletaddress}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
