import React from 'react'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Document({ myDocument }) {
    const user = useSelector(state => state?.auth?.authData)

    const history = useHistory()

    function onClickLink(param) {
        history.push(`/documents/${param}`)
    }

    return (
        <div><div onClick={() => onClickLink(myDocument._id)} className="p-6 rounded-md hover:bg-blue-50 border-2 border-gray-100 focus:outline-none block items-center mb-2 flex justify-between cursor-pointer min-h-full">
            <div className="flex flex-col w-full">
                <small className="pb-1">MAY, 5</small>
                <div className="w-full">
                    <h2 className="pb-3 capitalize font-bold truncate">{myDocument.title}</h2>
                    <p className="pb-1 text-gray-500 truncate">{myDocument.description}</p>
                </div>
                <div className="mt-2 mb-3">
                    {myDocument?.tags.map((tag) => <small className="px-2 py-1 text-blue-900 bg-blue-100 rounded-md lowercase mr-2">{tag.text}</small>)}
                </div>
                <small className="font-bold truncate">
                    Role: {myDocument?.admin?.email !== user?.result?.email ? <span><span className="bg-white text-sm text-blue-800">({myDocument?.admin?.email})</span> <span className="text-red-800 text-sm">editor</span></span> : <span className="px-2 text-yellow-800 text-sm">admin</span>}
                </small>
            </div>
        </div></div>
    )
}
