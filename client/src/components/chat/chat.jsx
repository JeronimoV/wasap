"use client"

import ChatCard from "../chatCard/chatCard"
import { useEffect, useState } from "react"
import styles from "./chat.module.css"
import { useRouter } from "next/navigation"

const Chats = ({actualSocket}) => {

    const [id, setId] = useState(null)

    const [allChats, setAllChats] = useState(null)

    const router = useRouter()

    const getChats = async (UserId) => {
        console.log("Este chaval",UserId);
        await fetch(`http://localhost:3001/chat/${UserId}`).then(response => response.json()).then(response => setAllChats(response))
    }

    useEffect(() => {
        actualSocket.on("new-chat", (event) => {
            console.log("SOY EL EVENT", event);
            const oldChats = [...allChats]
            oldChats.unshift(event)
            setAllChats(oldChats)
        })
        return () => {
            actualSocket.off("new-chat")
        }
    }, [actualSocket])

    useEffect(() => {
        const actualId = localStorage.getItem("id")
        console.log("ID?", actualId);
        if(actualId){
            setId(actualId)
        }else{
            router.push("/notLogged")
        }
    }, [])

    useEffect(() => {
        if(id){
            console.log("SOY EL ID", id);
            getChats(id)
        }
    }, [id])

    if(!allChats || allChats === null){
        return <p>Loading...</p>
    }

    console.log(allChats);

        return (
            <div className={styles.container}>
                {
                    allChats.length === 0 ? <p>Add contacts to start chating!</p>: allChats.map(value => <ChatCard info={value}/>)
                }
            </div>
    )
}

export default Chats