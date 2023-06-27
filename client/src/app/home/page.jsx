"use client"

import Chats from "@/components/chat/chat"
import styles from "./home.module.css"
import SearchBar from "@/components/searchBar/searchBar"
import Messages from "@/components/messages/messages"
import { connectUser } from "@/context/globalContext"

const Home = () => {

    const actualSocket = connectUser()

    return (
        <div className={styles.back}>
            <SearchBar/>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.header}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"/>
                        <div className={styles.titleHeader}>
                            <p className={styles.title}>Wasap</p>
                            <h2 className={styles.secondTitle}>Instant Messaging App</h2>
                        </div>
                    </div>
                    { actualSocket ? <Chats actualSocket={actualSocket}/> : <p>Loading...</p>}
                </div>
                <div className={styles.right}>
                    { actualSocket ? <Messages actualSocket={actualSocket}/> : <p>Loading...</p>}
                </div>
            </div>
        </div>
    )
}

export default Home