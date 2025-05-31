
import { useState } from "react";
import styles from "./MainPage.module.css";

export default function ChatList(props) {

    const chat = props.chat;
    const setChat = props.setChat;

    const openChat = (item) => {
        setChat(item);
    }

    return (
        <div className={styles.chatList}>
            {(props.type == "chats")? (
                <h3>Chat</h3>
            ) : (props.type == "groups") ? (
                <h3>Gruppi</h3>
            ) : (
                <h3>Chiamate</h3>
            )}
            {props.data.map((item, index) => (
                <div className={styles.rowItem} onClick={() => openChat(item)}>
                    <div className={styles.avatar}>{
                    }</div>
                    <h3>{item.ChatName || item.GroupName || ("Call "+item.CallId)}</h3>
                </div>
            ))}
        </div>
    );
}