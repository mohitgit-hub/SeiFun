import React, { useEffect, useState, useTransition } from 'react'
import MemeCoinCard from './MemeCoinCard'
import Search from './Search'
import image1 from '../assets/images/image1.jpg'
import image2 from '../assets/images/image2.jpg'
import image3 from '../assets/images/image3.jpg'
import image4 from '../assets/images/image4.jpg'
import image5 from '../assets/images/image5.jpg'

export default function HackathonLists() {
	const [searchItem, setSearchItem] = useState('')
	const [memeCoins, setMemeCoins] = useState([
		{
			createdBy: 'Elon Musk Fan Club',
			tokenName: 'CodeFusion Coin',
			ticker: 'CFC',
			description:
				'A meme coin inspired by the fusion of code and memes, perfect for devs who live on caffeine and chaos.',
			image: image1,
		},
		{
			createdBy: 'OpenAI Degens',
			tokenName: 'AI Pepe',
			ticker: 'AIPP',
			description:
				'An AI-themed meme coin backed by neural network dreams and GPU screams.',
			image: image2,
		},
		{
			createdBy: 'Green Degen Collective',
			tokenName: 'EcoDank',
			ticker: 'ECO',
			description:
				'A green meme coin that promises to plant a tree every time someone rage quits crypto.',
			image: image3,
		},
		{
			createdBy: 'HealthChain Bros',
			tokenName: 'MedMeme',
			ticker: 'MED',
			description:
				'The healthiest meme coin on the blockchain—prescribed by Web3 doctors.',
			image: image4,
		},
		{
			createdBy: 'Darknet Legends',
			tokenName: 'CyberShiba',
			ticker: 'CSHIBA',
			description:
				'A cyberpunk-style meme token trained in martial arts and cybersecurity.',
			image: image5,
		},
		{
			createdBy: 'Tokyo Moon Squad',
			tokenName: 'AutoDoge',
			ticker: 'ADOGE',
			description:
				'For fans of self-driving memes and rocket-powered transportation to the moon.',
			image: image1,
		},
		{
			createdBy: 'Darknet Legends',
			tokenName: 'CyberShiba',
			ticker: 'CSHIBA',
			description:
				'A cyberpunk-style meme token trained in martial arts and cybersecurity.',
			image: image2,
		},
		{
			createdBy: 'Tokyo Moon Squad',
			tokenName: 'AutoDoge',
			ticker: 'ADOGE',
			description:
				'For fans of self-driving memes and rocket-powered transportation to the moon.',
			image: image3,
		},
	])

	// Function to add new event
	// const addEvent = (newEvent) => {
	// 	setHackEvents((prevEvents) => [...prevEvents, newEvent])
	// }

	// const filteredHackathonsEvents = searchItem
	// 	? hackEvents.filter(
	// 			(hack) =>
	// 				hack.title
	// 					.toLowerCase()
	// 					.includes(searchItem.toLowerCase()) ||
	// 				hack.location
	// 					.toLowerCase()
	// 					.includes(searchItem.toLowerCase()) ||
	// 				hack.type.toLowerCase().includes(searchItem.toLowerCase())
	// 	  )
	// 	: hackEvents

	return (
		<div className='text-white'>
			{/* <Search searchItem={searchItem} setSearchItem={setSearchItem} /> */}

			<h1 className='font-bold text-2xl text-center my-6 bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent'>
				Meme Coins
			</h1>
			<div className='flex flex-wrap gap-8 justify-center max-w-[1200px] mx-auto'>
				{memeCoins.map((event, index) => (
					<MemeCoinCard
						key={index}
						createdBy={event.createdBy}
						tokenName={event.tokenName}
						ticker={event.ticker}
						description={event.description}
						image={event.image} // Fallback image
					/>
				))}
			</div>
		</div>
	)
}
