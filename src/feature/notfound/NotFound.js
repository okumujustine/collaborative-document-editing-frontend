import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="md:text-3xl text-2xl pt-10 md:pt-20 text-red-600 font-bold">404 - Not Found!</h1>
            <Link to="/" className="text-blue-800 font-bold hover:underline lg:pt-8 pt-4 text-xl">
                Go Home
            </Link>
        </div>
    )
}
