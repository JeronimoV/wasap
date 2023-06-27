"use client"

import { useState } from "react"
import styles from "./registerForm.module.css"
import swal from "sweetalert"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Registerform = () => {

    const router = useRouter()

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        nickName: ""
    })

    const handleInput = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    }

    const submitRegister = async(e) => {
        e.preventDefault()
        await fetch("http://localhost:3001/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData)
        }).then(async response => {
            if(response.ok){
                const responseJSON = await response.json()
                localStorage.setItem("id", responseJSON.id)
                localStorage.setItem("nickname", responseJSON.nickName)
                await swal({
                    title: "Register with success!",
                    text: "User registered, welcome!",
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
        text: err,
        icon: "error",
    }))
    }

    return(
        <div className={styles.container}>
            <div className={styles.register}>
                <h3>Register</h3>
                <form className={styles.form} onSubmit={submitRegister}>
                    <input onChange={handleInput} name="nickName" value={registerData.nickName} placeholder="Nickname"/>
                    <input onChange={handleInput} name="email" value={registerData.email} placeholder="Email"/>
                    <input onChange={handleInput} type="password" name="password" value={registerData.password} placeholder="Password"/>
                    <button>Register</button>
                </form>
                <Link className={styles.link} href="/login">I have an account!</Link>
            </div>
        </div>
    )
}

export default Registerform