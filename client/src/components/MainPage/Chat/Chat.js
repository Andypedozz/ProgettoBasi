import { useEffect, useState } from "react"
import styles from "./Chat.module.css"
import TextBar from "./TextBar";

export default function Chat(props) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(!props.chat) return;

        fetch("/chat/"+props.chat.ChatId, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setMessages(data);
        })
    }, [props.chat.ChatId, props.chat]);

    return (
        <div className={styles.chatArea}>
            <div className={styles.chatHeader}>
                <h1>{props.chat.ChatName || props.chat.GroupName}</h1>
            </div>
            <div className={styles.chatMessages}>
                {messages.map((message, index) => (
                    message.SentReceived ? (
                        <div className={styles.messageSent}>{message.Text}</div>
                    ) : (
                        <div className={styles.messageReceived}>{message.Text}</div>
                    )
                ))}
            </div>
            <TextBar />
        </div>
    )
}