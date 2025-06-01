import { useEffect, useState } from 'react';
import styles from './Chat.module.css';
import TextBar from './TextBar';

export default function Chat({ chat, type }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!chat) return;

        const suffix = type === 'chats' ? `/chat/${chat.ChatId}` : `/group/${chat.GroupId}`;

        fetch(`/api${suffix}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Errore nel fetch dei messaggi');
                return res.json();
            })
            .then((data) => setMessages(data))
            .catch((err) => console.error(err));
    }, [chat?.ChatId, chat?.GroupId]);

    const getChatName = () => chat?.ChatName || chat?.GroupName || 'Chat';

    return (
        <div className={styles.chatArea}>
            <header className={styles.chatHeader}>
                <h1>{getChatName()}</h1>
            </header>

            <section className={styles.chatMessages}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.SentReceived
                                ? styles.messageSent
                                : styles.messageReceived
                        }
                    >
                        {message.Text}
                    </div>
                ))}
            </section>

            <TextBar
                chat={chat}
                type={type}
                messages={messages}
                setMessages={setMessages}
            />
        </div>
    );
}
