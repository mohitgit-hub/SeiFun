import React, { useEffect, useState } from 'react'
import { FaBitcoin, FaWallet, FaUserCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Search from './Search'
import GlowButton from './GlowButton'
import WalletModal from '../modal/WalletModal'
import { RxHamburgerMenu } from 'react-icons/rx'
import { VscChromeClose } from 'react-icons/vsc'
import logo from '@/assets/images/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { setAddress, setBalance } from '@/redux/features/wallet/walletSlice'

export default function Navbar() {
    const [showModal, setShowModal] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()

    const currentPath = location.pathname
    const hideSearchOnRoutes = ['/addCoins', '/wallet', '/feedback']
    const shouldShowSearch = !hideSearchOnRoutes.includes(currentPath)

    const { address, balance } = useSelector((state) => state.wallet)

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
        <nav className="py-7 px-10 md:px-14 border-b-2 border-b-blue-600 border-opacity-30 mb-6 md:mb-12">
            <div className="flex justify-between items-center h-full text-white">
                {/* Logo */}
                <div className="flex justify-center items-center">
                    <img className="w-6 md:w-12 h-auto mr-2" src={logo} alt="logo" />
                    <h1 className="text-xl md:text-3xl font-bold tracking-wider">
                        <Link to="/">
                            SEI<span className="text-sky-500">.FUN</span>
                        </Link>
                    </h1>
                </div>

                {/* Search (only desktop) */}
                {shouldShowSearch && (
                    <div className="hidden md:block w-1/2">
                        <Search />
                    </div>
                )}

                {/* Desktop Menu */}
                <div className="hidden md:flex justify-center items-center tracking-widest ">
                    <ul className="flex justify-center items-center gap-8 text-md mx-8">
                        <li className="animate-pulse border-2 border-pink-400 px-4 py-3 rounded-xl flex justify-center items-center">
                            <Link to="/addCoins">
                                <div className="flex items-center">
                                    Create Coin
                                    <span className="relative flex size-3">
                                        <span className="absolute -top-6 left-10 inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative -top-6 left-10 inline-flex size-3 rounded-full bg-sky-500"></span>
                                    </span>
                                    <FaBitcoin className="ml-1" size={18} />
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

                {/* Mobile Hamburger (only visible if menu is closed) */}
                <div className="md:hidden">
                    {!isOpen && <RxHamburgerMenu size={28} onClick={() => setIsOpen(true)} />}
                </div>
            </div>

            {/* Slide-in Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full bg-[#1f1f1f] text-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } w-[70%] md:hidden shadow-lg pt-10 px-6`}
            >
                {/* Close Button inside the menu */}
                <div className="absolute top-6 right-6 cursor-pointer">
                    <VscChromeClose size={28} onClick={() => setIsOpen(false)} />
                </div>

                <ul className="flex flex-col gap-6 text-lg mt-10">
                    <li>
                        <Link
                            to="/addCoins"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2"
                        >
                            <FaBitcoin /> Create Coin
                        </Link>
                    </li>
                    <li>
                        {address ? (
                            <button
                                onClick={() => {
                                    setShowModal(true)
                                    setIsOpen(false)
                                }}
                                className="flex items-center gap-2"
                            >
                                <FaUserCircle />
                                {address.slice(0, 5)}...{address.slice(-4)}
                            </button>
                        ) : (
                            <Link
                                to="/wallet"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2"
                            >
                                <FaWallet /> Connect Wallet
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link
                            to="/userTransactions"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2"
                        >
                            💸 Transactions
                        </Link>
                    </li>
                    <li>
                        <a
                            href="/form.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2"
                        >
                            📝 Feedback
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
