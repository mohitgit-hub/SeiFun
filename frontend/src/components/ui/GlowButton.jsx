import React from 'react'
import { Link } from 'react-router-dom'

export default function GlowButton({ path = '', text, children, onClick, color }) {
    // Define color map for button highlighting
    const colorMap = {
        yellow: 'from-yellow-400 via-yellow-500 to-yellow-600',
        pink: 'from-pink-600 via-pink-600 to-pink-600',
        blue: 'from-blue-400 via-blue-500 to-blue-600',
        green: 'from-green-400 via-green-500 to-green-600',
        purple: 'from-purple-400 via-purple-500 to-purple-600',
        // Add more if needed
    }

    const highlight = colorMap[color] || 'from-fuchsia-600 via-purple-600 to-indigo-600' // default glow

    const buttonContent = (
        <button
            className={`relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 
                ${color ? '' + color + '-500' : ''}`}
            onClick={onClick}
        >
            <span
                className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
                    bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]`}
            />
            <span
                className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md 
                    bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl
                    bg-gradient-to-r ${highlight}`}
            >
                <span className="inline-flex items-center gap-2 tracking-wider font-poppins">
                    {text}
                    {children}
                </span>
            </span>
        </button>
    )

    return path ? <Link to={path}>{buttonContent}</Link> : <div>{buttonContent}</div>
}
