import { useEffect, useState } from "react"
import {io} from "socket.io-client"

const connectUser = (socket) => {

    const [actualSocket, setActualSocket] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        const actualId = localStorage.getItem("id")
        if(actualId){
            setId(actualId)
        }
    }, [])

    useEffect(() => {
        const socket = io(`http://localhost:3001`)
        socket.on("connect", () => {
            socket.emit("connect_user", id)
        })
        setActualSocket(socket)
        return () => {
            socket.off("connect")
        }
    }, [id])

    return actualSocket
}

export {
    connectUser,
};