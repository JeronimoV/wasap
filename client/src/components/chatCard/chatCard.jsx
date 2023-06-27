import { useDispatch } from "react-redux"
import styles from "./chatCard.module.css"
import { saveChatId, saveFriendId } from "@/redux/slices/chatSlices"

const ChatCard = ({info}) => {

    const dispatch = useDispatch()

    console.log(info);

    const openChat = () => {
        dispatch(saveChatId(info.ChatsData.id))
        dispatch(saveFriendId(info.id))
    }

    return (
        <div onClick={openChat} className={styles.container}>
            <img className={styles.profilePicture} src={info.picture}/>
            <div className={styles.userData}>
                <p className={styles.userName}>{info.nickName}</p>
                <p className={styles.lastMessage}>Ultimo mensaje</p>
            </div>
        </div>
    )
}

export default ChatCard