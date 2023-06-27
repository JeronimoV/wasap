"use client"

import { useEffect, useState } from "react"
import styles from "./searchBar.module.css"
import SearchCard from "../searchResultCard/searchCard"
import { useRouter } from "next/navigation"
import swal from "sweetalert"
import Link from "next/link"

const SearchBar = () => {

    const [searchData, setSearchData] = useState("")
    const [searchResult, setSearchResult] = useState(null)
    const [nickname, setNickname] = useState(null)

    const router = useRouter()

    useEffect(() => {
        const actualNickname = localStorage.getItem("nickname")
        if(actualNickname){
            setNickname(actualNickname)
        }
    }, [])

    const searchContacts = async(e) => {
        e.preventDefault()
        await fetch(`https://back-end-production-047b.up.railway.app/user/search/${searchData}`).then(response => response.json()).then(response => setSearchResult(response))
        setSearchData("")
    }

    const handleInput = (e) => {
        setSearchData(e.target.value)
    }

    const closeResults = () => {
        setSearchResult(null)
    }

    const logout = () => {
        localStorage.clear()
        swal("Getting out! Please wait")
        router.push("/login")
    }

    return (
        <div className={styles.container}>
            <div>
                <form onSubmit={searchContacts} className={styles.searchDiv}>
                    <input onChange={handleInput} value={searchData} className={styles.searchBar} placeholder="Search your friends!"/>
                    <button className={styles.button}><img className={styles.searchButton} src="https://img.uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"/></button>
                </form>
                <div className={searchResult !== null && searchResult.length > 0 ? styles.results : styles.none}>
                {
                    searchResult !== null && searchResult.length > 0 ? <p className={styles.close} onClick={closeResults}>X</p> : null
                }
                <div className={styles.allResults}>
                    {
                        searchResult !== null && searchResult.length > 0 ? 
                        searchResult.map(value => 
                            <SearchCard data={value}/>
                        ): null
                    }
                </div>
                </div>
            </div>
            <Link href={`/home/${nickname}`} className={styles.logout}>
                <img src="https://www.svgrepo.com/show/377111/user.svg"/>
            </Link>
            <div onClick={logout} className={styles.logout}>
                <img src="https://www.svgrepo.com/show/376873/door-exit.svg"/>
            </div>
        </div>
    )
}

export default SearchBar