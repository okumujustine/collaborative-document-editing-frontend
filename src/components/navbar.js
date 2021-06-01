import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { LOGOUT } from "../redux/actions/types"

export default function Navbar() {

    const dispatch = useDispatch()

    const user = useSelector(state => state?.auth?.authData)

    const logout = () => {
        dispatch({ type: LOGOUT })
    }

    return (
        <div className="flex flex-row justify-between px-10 border-b-2 border-gray-2 py-2 items-center sticky top-0 w-full bg-white">
            <div className="flex flex-row items-center">
                <Link className="text-2xl font-bold pr-10" to="/">DE</Link>
                <Link className="px-2" to="/">Home</Link>
                <Link to="/documents">Documents</Link>
            </div>
            {user?.result ? <div className="flex flex-row items-center">
                <div className="px-3">{user?.result?.name}</div>
                <button onClick={logout} className="bg-red-800 hover:bg-red-500 px-3 py-1 text-white focus:outline-none">
                    LOGOUT
                </button>
            </div> : <Link to="/auth" className="bg-green-800 hover:bg-green-500 px-3 py-1 text-white font-bold focus:outline-none">LOGIN</Link>}
        </div>
    )
}
