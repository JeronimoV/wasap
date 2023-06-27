"use client"

import Link from "next/link"
import styles from "./loginForm.module.css"
import { useState } from "react"
import swal from "sweetalert"
import { useRouter } from "next/navigation"

const LoginForm = () => {

    const [loginData, setLoginData] = useState({email: "", password: ""})

    const router = useRouter()

    const loginSubmit = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:3001/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        }).then(async response => {
            if(response.ok){
                const responseJSON = await response.json()
                console.log(responseJSON);
                localStorage.setItem("id", responseJSON.id)
                localStorage.setItem("nickname", responseJSON.nickName)
                await swal({
                    title: "Login with success!",
                    text: "User logged, welcome!",
                    icon: "success",
                })
                router.push("/home")
            }else{
                const responseJSON = await response.json()
                await swal({
                    title: "Something goes wrong",
                    text: responseJSON,
                    icon: "error",
                })
            }
    }).catch(err => swal({
        title: "Something goes wrong!",
        text: String(err),
        icon: "error",
    }))
    }

    const handleInput = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    return(
        <div className={styles.container}>
            <div className={styles.login}>
                <h3>Log In</h3>
                <form onSubmit={loginSubmit} className={styles.form}>
                    <input onChange={handleInput} name="email" value={loginData.email} placeholder="Email"/>
                    <input onChange={handleInput} type="password" name="password" value={loginData.password} placeholder="Password"/>
                    <button>Log In</button>
                </form>
                <Link className={styles.link} href="/register">I don´t have an account!</Link>
            </div>
        </div>
    )
}

export default LoginForm