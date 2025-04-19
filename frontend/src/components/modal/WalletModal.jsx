import React from 'react'
import { MdContentCopy } from 'react-icons/md'
import { MdOutlineLogout } from 'react-icons/md'

export default function WalletModal({ address, balance, onClose, onCopy, onLogout }) {
    console.log(balance)
    return (
        <div className="absolute right-0 mt-4 w-80 bg-darkGray text-slate-200 p-5 rounded-md z-50">
            <button
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-600 "
                onClick={onClose}
            >
                &times;
            </button>

            <div className="mb-4">
                <h2 className="text-md font-bold text-sky-600 mb-2">Wallet Address</h2>
                <div className="flex items-center gap-3 ">
                    <p className="text-sm break-words ">
                        {address.slice(0, 5)}...{address.slice(-4)}
                    </p>
                    <button onClick={onCopy}>
                        <MdContentCopy />
                    </button>
                </div>
            </div>

            <h2 className="text-md font-bold text-sky-600 mb-2">Balance</h2>
            <p className="text-sm mb-4">{balance} SEI</p>

            <button
                onClick={onLogout}
                className="flex justify-center gap-2 items-center w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition"
            >
                <MdOutlineLogout size={24} />
                Logout
            </button>
        </div>
    )
}
