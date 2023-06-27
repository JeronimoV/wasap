import Link from "next/link";
import styles from "./searchCard.module.css"

const SearchCard = ({data}) => {
    console.log(data);
    return(
        <Link href={`/home/${data.nickName}`} className={styles.container}>
            <img src={data.picture}/>
            <p>{data.nickName}</p>
        </Link>
    )
}

export default SearchCard