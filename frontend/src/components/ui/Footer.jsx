import React from 'react'

export default function Footer() {
    return (
        <footer className="md:max-w-[1200px] max-w-80 mx-auto bg-white rounded-lg shadow-sm bg-gradient-to-r from-fuchsia-600 to-purple-600 mb-[200px] mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-14 py-7 gap-4">
                <div>
                    <div className="font-extrabold self-center text-2xl whitespace-nowrap text-white">
                        SEI.FUN
                    </div>
                </div>
                <div>
                    <ul className="flex flex-col md:flex-row gap-3 md:gap-5 text-white items-center text-lg font-medium tracking-wider font-montserrat">
                        <li>
                            <a href="/" className="hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
