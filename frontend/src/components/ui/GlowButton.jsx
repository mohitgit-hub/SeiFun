import React from 'react'
import { Link } from 'react-router-dom'

export default function GlowButton({ path = '', text, children, onClick }) {
    const buttonContent = (
        <button
            className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2"
            onClick={onClick}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                <span className="inline-flex items-center gap-2">
                    {text}
                    {children}
                </span>
            </span>
        </button>
    )

    return path ? <Link to={path}>{buttonContent}</Link> : <div>{buttonContent}</div>
}
