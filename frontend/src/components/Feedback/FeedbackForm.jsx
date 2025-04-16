import React from 'react'

export default function FeedbackForm() {
    return (
        <div className="max-w-sm mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <form className="space-y-4">
                <div>
                    <label
                        for="name"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label
                        for="email"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label
                        for="message"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Leave a comment..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    )
}
