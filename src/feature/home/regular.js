import React from 'react'
import { Link } from 'react-router-dom'

import collabpng from "../../assets/images/collab.png"

export default function Regular() {
    return (
        <div className="w-6/12 mx-auto mt-6">
            <h2 className="text-2xl text-gray-600 ">Collaboratively edit notes with your colleagues at your convenience ✍️!</h2>
            <div className="my-12">
                <Link className=" text-white px-4 py-2 bg-blue-800 hover:bg-blue-400" to="/auth">Get started</Link>
            </div>
            <div className="w-full" style={{ height: "300px", backgroundImage: `url(${collabpng})`, backgroundSize: "cover" }} />
        </div>
    )
}
