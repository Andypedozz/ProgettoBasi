
import ChatList from './ChatList';
import { useState } from 'react';
import styles from "./MainPage.module.css";
import Chat from './Chat/Chat';

export default function MainPage(props) {
    const setUser = props.setUser;

    const [items, setItems] = useState([])
    const [endpoint, setEndpoint] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);  
    const [chat, setChat] = useState(null);

    // Function to fetch data based on click
    const fetchData = (path) => {
        setLoading(true);
        setHasFetched(true);
        fetch("/api/"+path)
        .then((res) => {
        if(!res.ok) throw new Error("Errore nella richiesta");
            return res.json();
        })
        .then(data => {
            setItems(data);
            setEndpoint(path);
            setLoading(false);
        })
        .catch(err => {
            console.error("Errore nel fetch: "+err);
            setLoading(false);
        })
    }

    // Function to logout
    const disconnect = () => {
        fetch("/api/logout", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(() => {
            setUser(null);
        });
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.sidebar}>
                <div id={styles.disconnectDiv}>
                    <button className={styles.disconnectBtn} onClick={() => disconnect()}>Logout</button>
                </div>
                <div className={styles.profileSection}>
                    <h2>Your profile</h2>
                    <p>Hello, {props.user.Name}</p>  
                </div>
                <div className={styles.selectionSection}>
                    <button onClick={() => fetchData("chats")}>Chats</button>
                    <button onClick={() => fetchData("groups")}>Groups</button>
                    <button onClick={() => fetchData("calls")}>Calls</button>
                </div>
                {!hasFetched ? (
                    <div></div>
                ) : loading ? (
                    <p>Loading...</p>
                ) : items.length === 0 ? (
                    <p>No data to show.</p>
                ) : (
                    <ChatList data={items} type={endpoint} chat={chat} setChat={setChat}/>
                )} 
            </div>
                {chat ? (
                    <Chat chat={chat}/>
                ) : (
                    <div></div>
                )}
        </div>
    );
}