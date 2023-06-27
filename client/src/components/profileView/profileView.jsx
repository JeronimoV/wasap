"use client"

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from "./profileView.module.css"
import swal from 'sweetalert'
import { connectUser } from '@/context/globalContext'

const ProfileView = () => {

    const [id, setId] = useState(null)
    const [allUserInfo, setUserData] = useState(null)

    const actualSocket = connectUser()

    const params = useParams()
    const router = useRouter()

    const getUserData = async() => {
        await fetch(`https://back-end-production-047b.up.railway.app/user/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nickname: params.profile, id: id})
        }).then(response => response.json()).then(response => setUserData(response))
    }

    console.log(allUserInfo);

    const addContact = async () => {
        actualSocket.emit("create-chat", {UserId: id, FriendId:allUserInfo.userData.id})
            await swal({
                title: "Contact Added",
                text: "You are now contacts!",
                icon: "success",
            })
    }

    useEffect(() => {
        const userId = localStorage.getItem("id")
        if(userId){
            setId(userId)
        }
    }, [])

    useEffect(() => {
        if(id, params){
            getUserData()
        }
    }, [id])

    if(!id){
        return <p>Loading...</p>
    }

    if(!allUserInfo){
        return <p>Loading...</p>
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.containerInfo}>
                <div className={styles.imageContainer}>
                    <img className={styles.coverPhoto} src={allUserInfo.userData.coverPhoto}/>
                    <img className={styles.profilePhoto} src={allUserInfo.userData.picture}/>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.nickname}>{allUserInfo.userData.nickName}</p>
                    <p className={styles.textInfo}>Email: {allUserInfo.userData.email}</p>
                    {allUserInfo.userData.id === id ? null : allUserInfo.areContacts ? <p className={styles.textInfo}>You are contacts!</p> : <p className={styles.textInfo}>You are not contacts!</p>}
                </div>
                {allUserInfo.userData.id === id ? <button onClick={() => router.push(`/home/edit`)} className={styles.button}>Edit Profile</button> : allUserInfo.areContacts ? null :<button onClick={addContact} className={styles.button}><img className={styles.buttonImage} src='https://www.svgrepo.com/show/377013/plus.svg'/>Add contact</button>}
            </div>
        </div>
    )
}

export default ProfileView