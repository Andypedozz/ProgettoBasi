import { useState } from 'react';
import ChatList from './ChatList';
import Chat from './Chat/Chat';
import CallCard from './Chat/CallCard';
import ContactCard from './Chat/ContactCard';

export default function MainPage({ user, setUser }) {
    const [items, setItems] = useState([]);
    const [endpoint, setEndpoint] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [chat, setChat] = useState(null);
    const [call, setCall] = useState(null);
    const [contact, setContact] = useState(null);

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
                setContact={setContact}
            />
        );
    };

    return (
        <div className="h-screen w-screen flex bg-gray-100 text-gray-900 ">
        {/* Sidebar */}
        <aside className="w-[25%] bg-white p-6 flex flex-col justify-between shadow-lg">
            <div>
            <button
                onClick={disconnect}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 transition"
            >
                Logout
            </button>

            <section className="mt-8 mb-8">
                <h2 className="text-lg font-semibold mb-1">Your profile</h2>
                <p className="text-gray-600 text-sm">Hello, {user?.Name || 'Guest'}</p>
            </section>

            <section className="flex flex-row space-x-3">
                {['chats', 'groups', 'calls','contacts'].map((type) => (
                <button
                    key={type}
                    onClick={() => fetchData(type)}
                    className="w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition"
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
                ))}
            </section>
            </div>

            <div className="overflow-y-auto flex-1 mt-6">{renderContent()}</div>
        </aside>

        {/* Chat area */}
        <main className="w-[100%] bg-white border-x border-gray-200 overflow-y-auto flex flex-col shadow-inner rounded-r-lg">
            {chat && <Chat chat={chat} type={endpoint} />}
        </main>

        {/* Call card area */}
        {(call || contact) && (
            <aside className="w-[30%] bg-white p-6 overflow-y-auto shadow-lg rounded-l-lg">
                {call && <CallCard call={call} setCall={setCall}/>}
                {contact && <ContactCard contact={contact} setContact={setContact} />}
            </aside>
        )}
        </div>
    );
}
