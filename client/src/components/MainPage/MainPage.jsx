import { useState } from 'react';
import ChatList from './ChatList';
import Chat from './Chat/Chat';
import CallCard from './Chat/CallCard';
import styles from './MainPage.module.css';

export default function MainPage({ user, setUser }) {
    const [items, setItems] = useState([]);
    const [endpoint, setEndpoint] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [chat, setChat] = useState(null);
    const [call, setCall] = useState(null);

    const fetchData = async (path) => {
        try {
            setLoading(true);
            setHasFetched(true);
            const res = await fetch(`/api/${path}`);
            if (!res.ok) throw new Error('Errore nella richiesta');
            const data = await res.json();
            setItems(data);
            setEndpoint(path);
        } catch (err) {
            console.error('Errore nel fetch:', err);
        } finally {
            setLoading(false);
        }
    };

    const disconnect = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            setUser(null);
        } catch (err) {
            console.error('Errore durante il logout:', err);
        }
    };

    const renderContent = () => {
        if (!hasFetched || loading) return null;
        if (items.length === 0) return <p>Nessun elemento trovato.</p>;

        return (
            <ChatList
                data={items}
                type={endpoint}
                chat={chat}
                setChat={setChat}
                call={call}
                setCall={setCall}
            />
        );
    };

    return (
        <div className={styles.mainContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.disconnectDiv}>
                    <button className={styles.disconnectBtn} onClick={disconnect}>
                        Logout
                    </button>
                </div>

                <section className={styles.profileSection}>
                    <h2>Your profile</h2>
                    <p>Hello, {user?.Name || 'Guest'}</p>
                </section>

                <section className={styles.selectionSection}>
                    <button onClick={() => fetchData('chats')}>Chats</button>
                    <button onClick={() => fetchData('groups')}>Groups</button>
                    <button onClick={() => fetchData('calls')}>Calls</button>
                </section>

                {renderContent()}
            </aside>

            {chat && <Chat chat={chat} type={endpoint} />}
            {call && <CallCard call={call} setCall={setCall} />}
        </div>
    );
}
