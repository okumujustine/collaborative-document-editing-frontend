import React, { useCallback, useEffect, useState } from 'react'
import Quill from "quill"
import { io } from "socket.io-client"
import { useParams, useHistory, useLocation } from "react-router-dom"
import { ApiInstance } from "../services/axios"
import { config } from '../constants/constants'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import "quill/dist/quill.snow.css"

const SAVE_INTERVAL_MS = 2000

export default function TextEditor() {
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuil] = useState()
    const [doc, setDoc] = useState()
    const [editorEmail, setEditorEmail] = useState("")

    const history = useHistory()
    const location = useLocation()
    const alert = useAlert()

    const user = useSelector(state => state?.auth?.authData)
    const docBody = { documentId: documentId, email: user?.result?.email }

    useEffect(() => {
        ApiInstance.post('/find-document', docBody).then(res => {
            if (res.status === 200) {
                setDoc(res?.data?.document)
            }
        })
            .catch((error) => {
                if (error.response.data) {
                    alert.error(error?.response?.data?.data)
                    history.push("/home")
                    return
                }
                alert.error("Internal server error")
                history.push("/home")
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const socketInstance = io(config.url.socketURL)
        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doc])

    useEffect(() => {
        if (socket === null || quill === null || doc === null) return

        socket?.once('load-document', document => {
            quill?.setContents(document)
            quill?.enable()
        })

        socket?.emit('get-document', docBody)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, quill, documentId])

    useEffect(() => {
        if (socket === null || quill === null) return

        const interval = setInterval(() => {
            socket?.emit('save-document', quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }

    }, [socket, quill])

    const wrapperRef = useCallback((wrapper) => {

        if (wrapper === null) return;

        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)

        const quillInstance = new Quill(editor, {
            theme: 'snow'
        })

        quillInstance?.disable()
        quillInstance?.setText("Loading...")

        setQuil(quillInstance)
    }, [])


    useEffect(() => {
        if (socket === null || quill === null) return

        const handler = (delta) => {
            quill?.updateContents(delta)
        }

        socket?.on("receive-changes", handler)

        return () => {
            socket?.off('receive-changes', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket === null || quill === null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }

        quill?.on('text-change', handler)

        return () => {
            quill?.off('text-change', handler)
        }
    }, [socket, quill])

    function onSubmitEditor(e) {
        e.preventDefault()
        if (!editorEmail) return alert.error("Editors email must be provided")
        if (editorEmail === user?.result?.email) return alert.error("You can't add yourself as editor")
        if (doc?.editors.includes(editorEmail)) return alert.error(`${editorEmail} is already a editor`)

        ApiInstance.post('/add-editor', { editorEmail, documentId: documentId, adminId: user?.result?._id }).then(editor => {
            setDoc(editor?.data?.document)
            setEditorEmail("")
        }).catch(() => {
            alert.error("Failed to editor")
        })

    }
    if (!user && !user?.token) {
        history.push("/auth", { pathname: location.pathname })
    }

    return (
        <div className="flex mt-6 mx-6">
            <div className="w-3/12 flex flex-col">
                <div>
                    <form className="flex flex-col mb-4" onSubmit={onSubmitEditor}>
                        <label>Add Editor</label>
                        <input value={editorEmail} onChange={(e) => setEditorEmail(e.target.value)} className="w-9/12 border border-gray-800 px-2 focus:outline-none" placeholder="email address .." type="email" />
                        <button className="w-9/12  text-white hover:bg-blue-600 mt-2 bg-blue-800 shadow-md rounded-sm">Add</button>
                    </form>
                </div>
                <h2 className="underline font-bold">Editors</h2>
                <div className="mt-1">
                    <ol>
                        {doc?.editors.map((editor, index) => <li key={index}>{`${index + 1}. `} {editor}</li>)}
                    </ol>
                </div>
            </div>
            <div className="w-8/12" ref={wrapperRef}></div>
        </div>
    )
}
