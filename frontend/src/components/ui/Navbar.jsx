import React, { useEffect, useState } from 'react'
import { FaBitcoin, FaWallet, FaUserCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
//services imports
// import { useWalletLogic } from '../services/walletConnection'
// components imports
import Search from './Search'
import GlowButton from './GlowButton'
import WalletModal from '../modal/WalletModal'
// assets
import logo from '@/assets/images/logo.png'
// redux imports
import { useSelector, useDispatch } from 'react-redux'
import { setAddress } from '@/redux/features/wallet/walletSlice'
import { setBalance } from '@/redux/features/wallet/walletSlice'

export default function Navbar() {
    const [showModal, setShowModal] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()

    const currentPath = location.pathname
    const hideSearchOnRoutes = ['/addCoins', '/wallet', '/feedback']
    const shouldShowSearch = !hideSearchOnRoutes.includes(currentPath)

    const { address, balance } = useSelector((state) => state.wallet)
    console.log(address)

    useEffect(() => {
        const storedAddress = localStorage.getItem('walletaddress')
        const storedBalance = localStorage.getItem('walletBalance')

        if (storedAddress) dispatch(setAddress(storedAddress))
        if (storedBalance) dispatch(setBalance(storedBalance))
    }, [dispatch])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address)
    }

    const logout = () => {
        dispatch(setAddress(''))
        dispatch(setBalance(''))
        localStorage.removeItem('walletAddress')
        localStorage.removeItem('walletBalance')
        setShowModal(false)
    }

    return (
        <nav className="py-7 px-14 border-b-2 border-b-blue-600 border-opacity-30 mb-12">
            <div className="flex justify-between items-center h-full text-white">
                <div className="flex justify-center items-center baseline ">
                    <img className="w-12 h-auto mr-2" src={logo} alt="logo" />
                    <h1 className="text-3xl font-bold tracking-wider">
                        <Link to="/">
                            Sei<span className="text-sky-500">.Fun</span>
                        </Link>
                    </h1>
                </div>
                {shouldShowSearch && (
                    <div className="w-1/2">
                        <Search />
                    </div>
                )}

                <div className="flex justify-center items-center tracking-widest ">
                    <ul className="flex justify-center items-center gap-8 text-md mx-8">
                        <li className="animate-pulse border-2 border-pink-400 px-4 py-3 rounded-xl flex justify-center items-center">
                            <Link to="/addCoins" className="">
                                <div className="flex items-center ">
                                    Create Coin
                                    <span class="relative flex size-3">
                                        <span class="absolute -top-6 left-10 inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                        <span class="relative -top-6 left-10 inline-flex size-3 rounded-full bg-sky-500"></span>
                                    </span>
                                    <FaBitcoin className="ml-1 " size={18} />
                                </div>
                            </Link>
                        </li>

                        <li className="relative">
                            {address ? (
                                <div>
                                    <GlowButton
                                        text={`${address.slice(0, 5)}...${address.slice(-4)}`}
                                        onClick={() => setShowModal(!showModal)}
                                    >
                                        <FaUserCircle className="ml-1" size={18} />
                                    </GlowButton>
                                    {showModal && (
                                        <WalletModal
                                            address={address}
                                            balance={balance}
                                            onClose={() => setShowModal(false)}
                                            onCopy={copyToClipboard}
                                            onLogout={logout}
                                        />
                                    )}
                                </div>
                            ) : (
                                <Link to="/wallet" className="underLight">
                                    <div className="flex items-center">
                                        Connect Wallet
                                        <FaWallet className="ml-1" size={18} />
                                    </div>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
