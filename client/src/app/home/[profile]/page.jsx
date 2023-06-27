"use client"

import ProfileView from "@/components/profileView/profileView"
import styles from "./profile.module.css"

const Profile = () => {

    const backButton = () => {
        window.location.href = "/home"
    }

    return (
        <div className={styles.profile}>
            <button onClick={backButton} className={styles.button}><img className={styles.buttonImg} src='https://www.svgrepo.com/show/376758/arrow-left.svg'/></button>
            <ProfileView/>
        </div>
    )
}

export default Profile