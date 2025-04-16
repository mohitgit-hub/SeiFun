import React from 'react'

export default function HackCard({ createdAt, tokenName, ticker, description, imageUrl }) {
    return (
        <div
            className={`max-w-[276px] relative flex-1 min-w-[276px] bg-white border-2 border-transparent rounded-lg shadow-sm dark:bg-[#111114] dark:border-[#111114] hover:-translate-y-2 transition-transform duration-300 
             hover:shadow-[-4px_-1px_45px_0px_rgba(236,_72,_153,_0.7)]`}
        >
            <div className="relative bg-white dark:bg-[#111114]  rounded-lg overflow-hidden">
                <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={imageUrl}
                    alt="Sei Coins"
                />

                <div className="p-3">
                    <h5 className="my-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                        Created on - <span className="text-sky-500">{createdAt}</span>
                    </h5>
                    <div className="flex mb-3 gap-3  items-center">
                        {' '}
                        <p className=" font-bold  text-xl text-gray-700 dark:text-gray-400">
                            {tokenName}
                        </p>
                        <p className="bg-[#6b6b6b] px-3 py-1 text-gray-100 rounded-md text-md">
                            {ticker}
                        </p>
                    </div>

                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                        {description.length > 20 ? description.slice(0, 30) + '...' : description}
                    </p>
                </div>
            </div>
        </div>
    )
}
