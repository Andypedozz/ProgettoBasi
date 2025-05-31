
import styles from "./MainPage.module.css";

export default function ChatList(props) {

    const setChat = props.setChat;
    const setCall = props.setCall;
    const type = props.type;

    const openItem = (item) => {
        if(type === "chats" || type === "groups") {
            setChat(item);
        }else{
            setCall(item);
        }
    }

    return (
        <div className={styles.chatList}>
            {(props.type === "chats")? (
                <h3>Chat</h3>
            ) : (props.type === "groups") ? (
                <h3>Gruppi</h3>
            ) : (
                <h3>Chiamate</h3>
            )}
            {props.data.map((item, index) => (
                <div key={index} className={styles.rowItem} onClick={() => openItem(item)}>
                    <div className={styles.avatar}>{
                        type === "chats" ? (
                            item.ChatName.charAt(0).toUpperCase()
                        ) : type === "groups" ? (
                            item.GroupName.charAt(0).toUpperCase()
                        ) : (
                            item.CallId
                        )
                    }</div>
                    <h3>{item.ChatName || item.GroupName || ("Call "+item.CallId)}</h3>
                </div>
            ))}
        </div>
    );
}