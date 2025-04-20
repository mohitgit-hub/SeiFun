import React, { useEffect, useState } from 'react'
import { GoogleGenAI } from '@google/genai'

export default function ImageCreate({ memeCoinTitle, setFormData }) {
    const [loading, setLoading] = useState(false)

    // Initialize the GoogleGenAI instance with your API key
    const ai = new GoogleGenAI({ apiKey: 'AIzaSyCEbpgBq4DjNhNi2jnAYm_z_7Gdy5eT4QU' }) // Replace with your actual API key

    // Function to generate description and ticker title using Gemini model
    async function generateDescriptionAndTicker() {
        if (!memeCoinTitle) return // Exit if no memeCoinTitle is provided

        setLoading(true)
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: `${memeCoinTitle} : give description and ticker title for meme coin`, // Using memeCoinTitle as input
            })

            // Split response to get both description and tickerTitle
            const [generatedDescription, generatedTicker] = response.text.split(',')

            // Set formData with generated description and tickerTitle
            setFormData((prevState) => ({
                ...prevState,
                description: generatedDescription.trim(),
                tickerTitle: generatedTicker.trim(),
            }))
        } catch (error) {
            console.error('Error generating description and ticker title:', error)
        } finally {
            setLoading(false)
        }
    }

    // Trigger content generation whenever memeCoinTitle changes
    useEffect(() => {
        generateDescriptionAndTicker()
    }, [memeCoinTitle]) // Dependency on memeCoinTitle

    return (
        <div className="text-white text-center p-4">
            <div className="text-2xl font-bold mb-2">{memeCoinTitle}</div>

            {loading ? (
                <div className="text-lg animate-pulse">
                    Generating description and ticker title...
                </div>
            ) : (
                <div className="text-lg mt-4">Description and Ticker title generated.</div>
            )}
        </div>
    )
}
