import React, { useState } from 'react'

function CoinForm({ formData, setFormData, handleSubmit }) {
    const [showMoreOptions, setShowMoreOptions] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form className="max-w-md w-full" onSubmit={handleSubmit}>
            <h2 className="text-slate-50 font-bold text-xl text-center mb-4 tracking-wider">
                Create Coin
            </h2>

            {['memeCoinTitle', 'tickerTitle', 'description'].map((field, idx) => (
                <div key={idx} className="relative z-0 w-full mb-8 group">
                    <input
                        type="text"
                        name={field}
                        placeholder={
                            field === 'memeCoinTitle'
                                ? 'Meme Coin Title'
                                : field === 'tickerTitle'
                                  ? 'Ticker Title'
                                  : 'Description'
                        }
                        value={formData[field]}
                        onChange={handleChange}
                        required={field !== 'description'}
                        className="py-2.5 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                    />
                </div>
            ))}

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
                                placeholder={`${link.split('_')[0]} Link (optional)`}
                                value={formData[link]}
                                onChange={handleChange}
                                className="py-2.5 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                            />
                        </div>
                    ))}
                </>
            )}

            <div className="space-y-8 max-w-md mx-auto mb-8">
                <input
                    type="file"
                    name="image"
                    className="w-full text-slate-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded-lg"
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
