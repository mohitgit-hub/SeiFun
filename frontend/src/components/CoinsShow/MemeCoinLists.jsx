// src/components/HackathonLists.js
import React, { useEffect, useState } from 'react'
import MemeCoinCard from './MemeCoinCard'
import axios from 'axios'
import GlowButton from '../ui/GlowButton'
import { useSelector } from 'react-redux'
import Loader from '../ui/Loader'
import { ReactTyped } from 'react-typed'
import { getFactoryContractWithSigner } from '@/constants/factoryconfig.js'

// const fetchAndMergeCoins = async () => {
//     const backendRes = await axios.get('http://localhost:5000/api/coin/getAllCoins')
//     const backendCoins = backendRes.data

//     const contract = await getFactoryContractWithSigner()
//     const finalCoinList = []

//     for (let coin of backendCoins) {
//         const { id: hash } = coin // 'id' is the tx hash you stored in DB

//         try {
//             const chainData = await contract.getProjectByTxHash(hash) // or whatever method you make
//             const [tokenName, ticker, creator] = chainData

//             finalCoinList.push({
//                 ...coin,
//                 tokenName,
//                 ticker,
//                 creator,
//             })
//         } catch (err) {
//             console.warn(`Couldn't fetch chain data for hash ${hash}`, err)
//             finalCoinList.push(coin) // fallback
//         }
//     }

//     setCoins(finalCoinList) // or whatever state you're setting
// }

export default function MemeCoinLists() {
    const [memeCoins, setMemeCoins] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const searchQuery = useSelector((state) => state.search.query) // Get the search query from Redux

    // const fetchMemeCoins = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/coin/getCoins')
    //         const data = await response.data
    //         console.log('Fetched meme coins:', data)
    //         return data
    //     } catch (error) {
    //         console.error('Error fetching meme coins:', error)
    //         return []
    //     }
    // }

    useEffect(() => {
        const getCoins = async () => {
            try {
                const backendRes = await axios.get('http://localhost:5000/api/coin/getCoins')
                const backendCoins = backendRes.data

                const contract = await getFactoryContractWithSigner()
                const enrichedCoins = []

                for (let coin of backendCoins) {
                    const { id: hash } = coin

                    try {
                        const [tokenName, ticker, creator] = await contract.getProjectByTxHash(hash)
                        console.log('tokenname' + tokenName)
                        enrichedCoins.push({
                            ...coin,
                            tokenName,
                            ticker,
                            creator,
                        })
                    } catch (err) {
                        console.warn(`Failed to get on-chain data for ${hash}`, err)
                        enrichedCoins.push(coin)
                    }
                }

                setMemeCoins(enrichedCoins)
            } catch (err) {
                console.error('Error fetching or merging coins:', err)
            } finally {
                setIsFetching(false)
            }
        }

        getCoins()
    }, [])

    // Filter memeCoins based on the search query
    const filteredMemeCoins = searchQuery
        ? memeCoins.filter((coin) =>
              //   coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              //   coin.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                    <p className="md:text-3xl flex-1 text-center sm:text-2xl text-xl font-bold pr-2">
                        Deploy your Tokens With{' '}
                        <span className="text-sky-500">
                            OUR 💪ZERO CODE<span className="text-white"> Sei</span>.Fun
                            Platform{' '}
                        </span>
                        <ReactTyped
                            className="md:text-3xl text-center sm:text-2xl text-xl font-bold"
                            strings={[
                                'Easy😄 To Create😎',
                                'AI🔭 Enabled Generation!🤞',
                                'Faster⏩,Secure🔐 Deployment',
                            ]}
                            typeSpeed={30}
                            backSpeed={30}
                            loop
                        />
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
                            hashId={event.id}
                            createdAt={event.createdAt}
                            description={event.description}
                            imageUrl={event.path}
                            x_link={event.x_link}
                            tele_link={event.tele_link}
                            website_link={event.website_link}
                            tokenName={event.tokenName}
                            ticker={event.ticker}
                            creator={event.creator}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
