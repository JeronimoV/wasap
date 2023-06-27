"use client"

import styles from "./error.module.css"
import { useRouter } from "next/navigation"

const loginError = () => {

    const router = useRouter()

    return(
        <div className={styles.container}>
            <p className={styles.title}>You are not logged!</p>
            <p className={styles.subtitle}>Click the button to login</p>
            <button onClick={() => router.push("/login")} className={styles.button}>Go!</button>
        </div>
    )
}

export default loginError