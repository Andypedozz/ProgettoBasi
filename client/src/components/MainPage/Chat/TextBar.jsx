import { useState } from "react";
import styles from "./TextBar.module.css";

export default function TextBar(props) {
    const [text, setText] = useState("");
    const messages = props.messages;
    const setMessages = props.setMessages;
    const chat = props.chat;
    const type = props.type;

    const handleSend = () => {
        const trimmed = text.trim();

        if (trimmed !== "") {
            const currentDate = new Date();
            const datetime = currentDate.getFullYear() + "-"
                           + currentDate.getMonth() + "-"
                           + currentDate.getDate() + " "
                           + currentDate.getHours() + ":"
                           + currentDate.getMinutes() + ":"
                           + currentDate.getSeconds();
            const message = {
                "Text" : trimmed,
                "Read" : 0,
                "Pinned" : 0,
                "Datetime" : datetime,
                "SentReceived" : 1
            };

            if(type == "chats") {
                message.ChatId = chat.ChatId;
            }else if(type == "groups") {
                message.GroupId = chat.GroupId;
            }
    
            fetch("/api/addMessage", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(message)
            })
            .then(res => res.json())
            .then(() => {
                setMessages([...messages, message])
                setText("");
            }) 
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.textBarContainer}>
            <textarea
                className={styles.textInput}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Scrivi un messaggio"
                rows={1}
            />
            <button className={styles.sendButton} onClick={handleSend}>
                ➤
            </button>
        </div>
    );
}
