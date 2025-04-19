import React, { useState } from 'react'
import { getFactoryContractWithSigner } from '../../constants/factoryconfig'
import axios from 'axios'

function AddCoins() {
    const [memeCoinTitle, setMemeCoinTitle] = useState('')
    const [tickerTitle, setTickerTitle] = useState('')
    const [description, setDescription] = useState('')
    const [transactionStatus, setTransactionStatus] = useState('')
    const [xLink, setXLink] = useState('')
    const [teleLink, setTeleLink] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const [showMoreOptions, setShowMoreOptions] = useState(false)
    // const [imgUrl, setImgUrl] = useState('')

    const handleImageUpload = async (imageFile, txHash) => {
        if (!imageFile) {
            setTransactionStatus('Please select an image.')
            return
        }

        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', 'Sei-coin-images')
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

        setTransactionStatus('Sending image to the server...')

        try {
            // Send image to backend using axios
            const imageResult = await axios.post(import.meta.env.VITE_CLOUDINARY_BASE_URL, formData)

            const uploadedImageUrl = await imageResult.data.secure_url
            console.log('Image uploaded successfully:', uploadedImageUrl)

            const coinData = {
                id: txHash,
                x_link: xLink,
                tele_link: teleLink,
                website_link: websiteLink,
                description: description,
                path: uploadedImageUrl,
            }

            const res = await axios.post('http://localhost:5000/api/coin/createCoin', coinData)
            console.log(res.data)
            setTransactionStatus('Coin created successfully!')
        } catch (err) {
            console.error('Error uploading image:', err)
            setTransactionStatus(`Error: ${err.message}`)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setTransactionStatus('Connecting to wallet...')

        try {
            const contract = await getFactoryContractWithSigner()

            if (!contract) {
                setTransactionStatus('Error: Failed to connect to contract.')
                return
            }

            const signerAddress = await contract.signer.getAddress()
            console.log('Using wallet address:', signerAddress)

            setTransactionStatus('Sending transaction...')
            console.log('Calling createProject with:', memeCoinTitle, tickerTitle)

            const tx = await contract.createProject(memeCoinTitle, tickerTitle, {
                value: BigInt('20000000000000000'), // 0.02 SEI
            })

            if (!tx || !tx.hash) {
                setTransactionStatus('Transaction was not sent.')
                console.error('Transaction object is invalid:', tx)
                return
            }

            console.log('Transaction sent:', tx.hash)
            setTransactionStatus(`Transaction sent! Hash: ${tx.hash}`)
            const receipt = await tx.wait()

            console.log('Transaction receipt:', receipt)
            if (receipt.status === 1) {
                setTransactionStatus('Transaction confirmed! 🎉')
                await handleImageUpload(e.target.elements.image.files[0], tx.hash)
                setMemeCoinTitle('')
                setTickerTitle('')
                setDescription('')
            } else {
                setTransactionStatus('Transaction failed.')
            }
        } catch (error) {
            console.error('Transaction error:', error)
            setTransactionStatus(`Transaction failed: ${error.message}`)
        }
    }

    return (
        <div className="min-h-screen mt-12 flex flex-col items-center">
            <form className="max-w-md w-full" onSubmit={handleSubmit}>
                <h2 className="text-slate-50 font-bold text-xl text-center mb-4 tracking-wider">
                    Create Coin
                </h2>
                {/* Meme Coin Title */}
                <div className="relative z-0 w-full mb-8 group">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="py-2.5 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                        required
                        value={memeCoinTitle}
                        onChange={(e) => setMemeCoinTitle(e.target.value)}
                        placeholder="Meme Coin Title"
                    />
                </div>

                {/* Ticker Title */}
                <div className="relative z-0 w-full mb-8 group">
                    <input
                        type="text"
                        name="ticker"
                        id="ticker"
                        className="py-2.5 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                        placeholder="Ticker Title"
                        required
                        value={tickerTitle}
                        onChange={(e) => setTickerTitle(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div className="relative z-0 w-full mb-8 group">
                    <input
                        type="text"
                        name="description"
                        id="description"
                        className="py-2.5 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* More Options Toggle */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => setShowMoreOptions(!showMoreOptions)}
                        className="text-blue-600 hover:underline focus:outline-none text-md"
                    >
                        {showMoreOptions ? 'Hide Optional Links' : 'More Options'}
                    </button>
                </div>

                {/* Optional Links Section */}
                {showMoreOptions && (
                    <>
                        {/* X Link */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="url"
                                name="xlink"
                                id="xlink"
                                className="py-2.5 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                                placeholder="X (Twitter) Link (optional)"
                                value={xLink}
                                onChange={(e) => setXLink(e.target.value)}
                            />
                        </div>

                        {/* Telegram Link */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="url"
                                name="telelink"
                                id="telelink"
                                className="py-2.5 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                                placeholder="Telegram Link (optional)"
                                value={teleLink}
                                onChange={(e) => setTeleLink(e.target.value)}
                            />
                        </div>

                        {/* Website Link */}
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="url"
                                name="websitelink"
                                id="websitelink"
                                className="py-2.5 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4 focus:outline-none"
                                placeholder="Website Link (optional)"
                                value={websiteLink}
                                onChange={(e) => setWebsiteLink(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div className="space-y-8 max-w-md mx-auto mb-8">
                    <input
                        type="file"
                        name="image"
                        className="w-full text-slate-500 font-medium text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded-lg"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="min-w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center"
                >
                    Submit
                </button>
            </form>

            {/* Transaction Status */}
            {transactionStatus && (
                <div className="mt-4 p-4 border rounded-md bg-gray-80 dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-xl text-gray-900 dark:text-white">{transactionStatus}</p>
                </div>
            )}
        </div>
    )
}

export default AddCoins
