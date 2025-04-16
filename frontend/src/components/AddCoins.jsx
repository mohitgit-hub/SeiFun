import React, { useState } from 'react'
import { getFactoryContractWithSigner } from '../constants/factoryconfig'
import axios from 'axios'

function AddCoins() {
    const [memeCoinTitle, setMemeCoinTitle] = useState('')
    const [tickerTitle, setTickerTitle] = useState('')
    const [description, setDescription] = useState('')
    const [transactionStatus, setTransactionStatus] = useState('')
    // const [imgUrl, setImgUrl] = useState('')

    const handleImageUpload = async (imageFile) => {
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
                name: memeCoinTitle,
                ticker: tickerTitle,
                description: description,
                image: uploadedImageUrl,
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

        handleImageUpload(e.target.elements.image.files[0])
    }

    return (
        <div className="min-h-screen mt-12 flex flex-col items-center">
            <form className="max-w-md w-full" onSubmit={handleSubmit}>
                {/* Meme Coin Title */}
                <div className="relative z-0 w-full mb-8 group">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className=" py-2.5 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4  focus:outline-none"
                        required
                        value={memeCoinTitle}
                        onChange={(e) => setMemeCoinTitle(e.target.value)}
                        placeholder="Meme Coin Title "
                    />
                </div>

                {/* Ticker Title */}
                <div className="relative z-0 w-full mb-8 group">
                    <input
                        type="text"
                        name="ticker"
                        id="ticker"
                        className="py-2.5 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4  focus:outline-none"
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
                        className="py-2.5 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 px-4  focus:outline-none"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="relative z-0 w-full mb-5 group pl-4">
                    <label
                        htmlFor="image"
                        className="block mb-2 text-md text-gray-500 dark:text-gray-400"
                    >
                        Upload your image
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        className="block w-full text-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-80"
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
