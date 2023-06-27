"use client"

import {io} from "socket.io-client"
import styles from "./messages.module.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Messages = ({actualSocket}) => {

    const [id, setId] = useState(null)
    const [chatInfo, setChatInfo] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const [actualFriendId, setActualFriendId] = useState(null)
    const [actualChatId, setActualChatId] = useState(null)
    const [messageToShow, setMessageToShow] = useState(null)

    const actualFriendIdToSet = useSelector(value => value.saveChatInfo.friendId)
    const actualChatIdToSet = useSelector(value => value.saveChatInfo.chatId)

    const getChatInfo = async() => {
        await fetch(`https://back-end-production-047b.up.railway.app/chat/${id}`).then(response => response.json()).then(response => {
            setChatInfo(response)
    })
    }

    const findChat = () => {
        for (let i = 0; i < chatInfo.length; i++) {
            for (let j = 0; j < chatInfo.length; j++) {
                if(chatInfo[i].ChatsData.FriendId === actualFriendId || chatInfo[i].ChatsData.FriendId === id){
                    return i
                }
            }
        }
    }

    console.log(messageToShow);

    useEffect(() => {
        if(id && chatInfo === null){
            getChatInfo()
        }
    }, [id])

    useEffect(() => {
        if(actualFriendIdToSet, actualChatIdToSet){
            setActualFriendId(actualFriendIdToSet)
            setActualChatId(actualChatIdToSet)
        }
    }, [actualFriendIdToSet, actualChatIdToSet])

    
    useEffect(() => {
        console.log("ENTRE", actualFriendId);
        if(actualFriendId){
            const index = findChat(actualFriendId)
            console.log("INDEX",index);
            console.log("ESTE", chatInfo);
            setMessageToShow(chatInfo[index].ChatsData.allMessages)
        }
    }, [actualFriendId])

    useEffect(() => {
        const actualId = localStorage.getItem("id")
        if(actualId){
            setId(actualId)
        }
    }, [])

    useEffect(() => {
        actualSocket.on("new-message", async(event) => {
            const oldMessages = [...messageToShow]
            console.log("SOY EL EVENTOOO", event);
            oldMessages.unshift(event)
            console.log(oldMessages);
            setMessageToShow(oldMessages)
        })
        return () => {
            actualSocket.off("new-message")
        }
    }, [id,messageToShow])

    const handleInput = (e) => {
        setNewMessage(e.target.value)
    }

    if(!actualSocket){
        return <p>Loading...</p>
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        const index = await findChat(actualFriendId)
        console.log("ESTE SOY ESTE AAAAAAAAAAA", index);
        const dataToSend = {
            ChatId: actualChatId,
            message: newMessage,
            UserId: id,
            FriendId: id === chatInfo[index].ChatsData.FriendId ? chatInfo[index].ChatsData.UserId : chatInfo[index].ChatsData.FriendId
        }
        actualSocket.emit("send-message", dataToSend)
        setNewMessage("")
    }

    if(actualFriendId === null){
        return(
            <div>
                
            </div>
        )
    }

    return (
        <div className={styles.whitePanel}>
            <div className={styles.messages}>
                {
                    !messageToShow ? <p>This chat is so empty :/</p> : messageToShow.map(value => value.UserId === id ? <p className={styles.You}>{value.message}</p> : <p className={styles.Him}>{value.message}</p>)
                }
            </div>
            <form onSubmit={sendMessage} className={styles.input}>
                <input onChange={handleInput} value={newMessage} placeholder="Send your message"/>
                <button className={styles.button}><img className={styles.send} src="https://cdn-icons-png.flaticon.com/512/3106/3106794.png"/></button>
            </form>
        </div>
    )
}

export default Messages