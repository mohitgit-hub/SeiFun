import React, { useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'

import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API })

function CoinForm({ formData, setFormData, handleSubmit }) {
    const [showMoreOptions, setShowMoreOptions] = useState(false)
    const [loadingTicker, setLoadingTicker] = useState(false)
    const [loadingDescription, setLoadingDescription] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    async function tickerGenerate() {
        setLoadingTicker(true)
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents:
                'Generate a three letter ticker name word from this token name: ' +
                formData.memeCoinTitle +
                'and return that three letter back.',
        })
        console.log(response.text)
        setFormData((prev) => ({ ...prev, ['tickerTitle']: response.text }))
        setLoadingTicker(false)
    }

    async function descriptionGenerate() {
        setLoadingDescription(true)
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents:
                'Generate a 10 word funny meme coin description from this token name: ' +
                formData.memeCoinTitle +
                ' do not add bold type words always use normal words',
        })
        setFormData((prev) => ({ ...prev, ['description']: response.text }))
        console.log(response.text)
        setLoadingDescription(false)
    }

    return (
        <form
            className="max-w-lg w-full border-2 border-pink-200 border-opacity-15 px-12 pb-12 pt-8 rounded-md "
            onSubmit={handleSubmit}
        >
            <h2 className="text-slate-50 font-bold text-xl text-center mb-8 tracking-widest">
                Create Coin
            </h2>

            {/* Meme Coin Title Input */}
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="text"
                    name="memeCoinTitle"
                    placeholder="Meme Coin Title"
                    value={formData.memeCoinTitle}
                    onChange={handleChange}
                    required
                    className="py-2.5 pl-2 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 dark:text-white dark:border-gray-600  focus:outline-none"
                />
                <div className="text-right absolute right-2 -top-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (formData.memeCoinTitle.trim().length > 0) {
                                tickerGenerate()
                                descriptionGenerate()
                            }
                        }}
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium tracking-wider rounded-lg text-pink-700 bg-pink-100 "
                    >
                        Generate <span className="text-sm text-red-700 font-bold">AI*</span>
                    </button>
                </div>
            </div>

            {/* Ticker Title with Refresh */}
            <div className="relative z-0 w-full mb-6 group flex items-center gap-2">
                <input
                    type="text"
                    name="tickerTitle"
                    placeholder="Ticker Title"
                    value={formData.tickerTitle}
                    onChange={handleChange}
                    className="py-2.5 pl-2 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 dark:text-white dark:border-gray-600  focus:outline-none"
                    required
                />
                <button type="button" onClick={tickerGenerate} title="Regenerate Ticker">
                    <FiRefreshCw
                        className={`text-white ${loadingTicker ? 'animate-spin' : ''}`}
                        size={20}
                    />
                </button>
            </div>

            {/* Description with Refresh */}
            <div className="relative z-0 w-full mb-6 group flex items-center gap-2">
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3} // Adjust number of visible lines here
                    className=" w-full pl-2 text-md text-gray-900 bg-transparent border-0 border-b-2 dark:text-white dark:border-gray-600  focus:outline-none resize-none"
                />

                <button type="button" onClick={descriptionGenerate} title="Regenerate Description">
                    <FiRefreshCw
                        className={`text-white ${loadingDescription ? 'animate-spin' : ''}`}
                        size={20}
                    />
                </button>
            </div>

            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                    className="text-blue-600 hover:underline focus:outline-none text-md"
                >
                    {showMoreOptions ? 'Hide Optional Links' : 'More Options'}
                </button>
            </div>

            {showMoreOptions && (
                <>
                    {['x_link', 'tele_link', 'website_link'].map((link, i) => (
                        <div key={i} className="relative z-0 w-full mb-6 group">
                            <input
                                type="url"
                                name={link}
                                placeholder={`${link.split('_')[0].charAt(0).toUpperCase() + link.split('_')[0].slice(1)} Link (optional)`}
                                value={formData[link]}
                                onChange={handleChange}
                                className="py-2.5 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-2 focus:outline-none"
                            />
                        </div>
                    ))}
                </>
            )}

            <div className="space-y-8 max-w-md mx-auto mb-8">
                <input
                    type="file"
                    name="image"
                    className="w-full text-slate-500 font-medium text-base bg-gray-100 
                   cursor-pointer border border-gray-300 rounded-lg 
                   file:cursor-pointer file:border-0 file:py-2.5 file:px-4 
                   file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white"
                />
            </div>

            <button
                type="submit"
                className="min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center"
            >
                Submit
            </button>
        </form>
    )
}

export default CoinForm
