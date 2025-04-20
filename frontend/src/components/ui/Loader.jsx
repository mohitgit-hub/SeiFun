import React from 'react'

export default function Loader() {
    return (
        <div className="flex space-x-2 justify-center items-center bg-white min-h-[calc(100vh-600px)] mt-10 dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-5 w-5 bg-black rounded-full animate-bounce"></div>
        </div>
    )
}
