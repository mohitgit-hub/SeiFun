import React, { useEffect, useState } from 'react'

export default function ImageCreate({ memeCoinTitle, description }) {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchImage() {
            setLoading(true)
            // const prompt = `${memeCoinTitle} - ${description}`
            try {
                const response = await fetch(
                    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
                    {
                        headers: {
                            Authorization: 'Bearer YOUR_FREE_HF_API_KEY',
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            inputs: `${memeCoinTitle} - ${description}`,
                        }),
                    }
                )

                const blob = await response.blob()
                const imageUrl = URL.createObjectURL(blob)
                setImage(imageUrl)
            } catch (error) {
                console.error('Error generating image:', error)
            } finally {
                setLoading(false)
            }
        }

        if (memeCoinTitle && description) {
            fetchImage()
        }
    }, [memeCoinTitle, description])

    return (
        <div className="text-white text-center p-4">
            <div className="text-2xl font-bold mb-2">{memeCoinTitle}</div>
            <div className="mb-4">{description}</div>

            {loading ? (
                <div className="text-lg animate-pulse">Generating image...</div>
            ) : image ? (
                <img
                    src={image}
                    alt="Generated meme"
                    className="rounded-lg mx-auto mt-4 max-w-full h-auto"
                />
            ) : (
                <div className="text-red-500">Failed to load image.</div>
            )}
        </div>
    )
}
