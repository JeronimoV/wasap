import Link from "next/link"
import styles from "./landing.module.css"

const Landing = () => {

    return (
        <div className={styles.container}>
            <div className={styles.container2}>
                <div className={styles.titleDiv}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"/>
                    <div className={styles.titleText}>
                        <h1>Wasap</h1>
                        <h2>The better app to send messages</h2>
                    </div>
                </div>
                <p className={styles.text}>This site is, so to speak, a copy of WhatsApp, it is not a monetized project or intended for serious use, it is a project for JeronimoV's portfolio</p>
                <div className={styles.buttons}>
                    <Link className={styles.links} href={"/login"}>Log In</Link>
                    <Link className={styles.links} href={"/register"}>Register</Link>
                    <Link className={styles.links} href={"/home"}>Go Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Landing