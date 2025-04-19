import React from 'react'

export default function FeedbackForm() {
    return (
        <div className="max-w-sm mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <form
                target="_blank"
                action="https://formsubmit.co/rajlourdu15@gmail.com"
                method="POST"
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div>
                            <input
                                type="text"
                                name="name"
                                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email Address"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <textarea
                            placeholder="Your Message"
                            className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="message"
                            rows="10"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                        Submit Form
                    </button>
                </div>
            </form>
        </div>
    )
}
