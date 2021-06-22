import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { LOGOUT } from "../redux/actions/types"

export default function Navbar() {

    const dispatch = useDispatch()

    const user = useSelector(state => state?.auth?.authData)

    const logout = () => {
        dispatch({ type: LOGOUT })
    }

    return (
        <div className="flex flex-row justify-between lg:px-8 px-6 border-b-2 border-gray-2 py-2 items-center sticky top-0 w-full bg-white">
            <div className="flex flex-row items-center">
                <NavLink className="text-2xl font-bold pr-10" to="/">DE</NavLink>
            </div>
            <div className="flex flex-row items-center">
                <NavLink className="hover:border-gray-900 hover:border-b-2 px-2 mx-2 border-b border-white py-1" to="/home" activeClassName={classNames("border-gray-900 border-b")}>{user?.result?.name ? <span>Add Note</span> : <span>Home</span>} </NavLink>
                {user?.result ? <NavLink className="hover:border-gray-900 hover:border-b-2 px-2 mx-2 border-b border-white py-1" to="/documents" activeClassName="border-gray-900 border-b">Documents</NavLink> : null}
                {user?.result ?
                    <div className="flex flex-row items-center">
                        <div className=" hidden lg:block px-3 capitalize text-blue-800 font-bold">{user?.result?.name.toLowerCase()}</div>
                        <button onClick={logout} className="bg-red-800 hover:bg-red-500 lg:px-3 px-1 py-1 text-white focus:outline-none">
                            LOGOUT
                        </button>
                    </div>
                    :
                    <NavLink to="/auth" className="bg-green-800 hover:bg-green-500 px-3 py-1 text-white font-bold focus:outline-none">LOGIN</NavLink>
                }
            </div>
        </div>
    )
}
