import React from 'react'
import { FaBitcoin, FaWallet, FaUserCircle, FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Search from './Search'

export default function Navbar() {
	return (
		<nav className='py-7 px-14'>
			<div className='flex justify-between items-center h-full text-white'>
				<div>
					<h1 className='text-4xl font-bold tracking-wider'>
						<Link to='/'>
							Byte<span className='text-sky-500'>Token</span>
						</Link>
					</h1>
				</div>
				<div className='w-1/2'>
					<Search />
				</div>
				<div className='flex justify-center items-center tracking-widest'>
					<ul className='flex gap-8 text-normal mx-8'>
						<li>
							<Link to='/addCoins' className='underLight'>
								<div className='flex items-center'>
									Create Coin
									<FaBitcoin className='ml-1' size={18} />
								</div>
							</Link>
						</li>
						<li>
							<Link to='profile' className='underLight'>
								<div className='flex items-center'>
									Profile
									<FaUserCircle className='ml-1' size={18} />
								</div>
							</Link>
						</li>
						<li>
							<Link to='wallet' className='underLight'>
								<div className='flex items-center'>
									Connect Wallet
									<FaWallet className='ml-1' size={18} />
								</div>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
