import { useState } from 'react';
import styles from './TextBar.module.css';

export default function TextBar({ chat, type, messages, setMessages }) {
    const [text, setText] = useState('');

    const formatDatetime = () => {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');

        return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
               `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    };

    const handleSend = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const message = {
            Text: trimmed,
            Read: 0,
            Pinned: 0,
            Datetime: formatDatetime(),
            SentReceived: 1,
            ...(type === 'chats' && { ChatId: chat.ChatId }),
            ...(type === 'groups' && { GroupId: chat.GroupId }),
        };

        try {
            const res = await fetch('/api/addMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message),
            });

            if (!res.ok) throw new Error('Errore nell\'invio del messaggio');

            setMessages([...messages, message]);
            setText('');
        } catch (err) {
            console.error('Errore:', err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
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
