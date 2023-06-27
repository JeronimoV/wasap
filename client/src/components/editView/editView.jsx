"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./edit.module.css"
import swal from "sweetalert"
import { storage } from "../utils/firebase"
import {ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

const EditView = () => {

    const [id, setId] = useState(null)
    const [userData, setUserData] = useState(null)
    const [newData, setNewData] = useState(null)

    const router = useRouter()

    const uploadImage = async (e) => {
        const fileName = e.target.files[0]
        const imageRef = ref(storage, `${e.target.name}/${fileName.name + v4()}`)
        await uploadBytes(imageRef, fileName).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then(response => setNewData({...newData, [e.target.name]: response}))
        })
    }

    const getUserData = async (actualId) => {
        await fetch(`http://localhost:3001/user/${actualId}`).then(response => response.json()).then(response => setUserData(response))
    }

    useEffect(() => {
        const actualId = localStorage.getItem("id")
        if(actualId){
            getUserData(actualId)
            setId(actualId)
        }else{
            router.push("/notLogged")
        }
    }, [])

    useEffect(() => {
        if(userData){
            setNewData({id:id, picture: userData.picture, coverPhoto: userData.coverPhoto})
        }
    }, [userData])

    const handleInput = (e) => {
        setNewData({...newData, [e.target.name]: e.target.value})
    }

    const sendData = async (e) => {
        e.preventDefault()
        await fetch("http://localhost:3001/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData)
        }).then(async response => {if(response.ok){
            const responseJSON = await response.json()
            console.log(responseJSON);
            localStorage.setItem("nickname", responseJSON.nickName)
            await swal({
                title: "Updated with success!",
                text: "User Updated!",
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
        }})
    }

    console.log(userData);

    if(!userData || !newData){
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.image}>
                <label>Cover Photo:</label>
                    <input className={styles.inputImage} onChange={handleInput} name="coverPhoto" value={newData.coverPhoto} placeholder="Cover Photo"/>
                    <label className={styles.inputFile}>
                        Select a file
                        <input onChange={uploadImage} name="coverPhoto" type="file" className={styles.displayNone}/>
                    </label>
                </div>
                <div className={styles.image}>
                    <label>Profile Photo:</label>
                    <input className={styles.inputImage} onChange={handleInput} name="picture" value={newData.picture} placeholder="Profile Photo"/>
                    <label className={styles.inputFile}>
                        Select a file
                        <input onChange={uploadImage} name="picture" type="file" className={styles.displayNone}/>
                    </label>
                </div>
                <input className={styles.input} onChange={handleInput} name="nickName" value={newData.nickName} placeholder={userData.nickName}/>
                <input className={styles.input} onChange={handleInput} name="email" value={newData.email} placeholder={userData.email}/>
                <button className={styles.buttonSubmit} onClick={sendData}>Update!</button>
            </div>
            <div className={styles.profile}>
                <img className={styles.coverPhoto} src={newData.coverPhoto}/>
                <img className={styles.profilePhoto} src={newData.picture}/>
                <div className={styles.userInfo}>
                    <p className={styles.nickname}>{newData.nickName ? newData.nickName: userData.nickName}</p>
                    <p className={styles.email}>{newData.email ? newData.email : userData.email}</p>
                    <button disabled className={styles.button}><img className={styles.buttonImage} src='https://www.svgrepo.com/show/377013/plus.svg'/>Add contact</button>
                </div>
            </div>
        </div>
    )
}

export default EditView