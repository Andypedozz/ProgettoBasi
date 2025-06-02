import { useEffect, useState } from 'react';
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
        <div className="flex flex-col h-full bg-white text-gray-900">
            {/* Header Chat */}
            <header className="bg-indigo-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <h1 className="text-xl font-semibold truncate">{getChatName()}</h1>
            </header>

            {/* Messaggi */}
            <section className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100">
                {messages.map((message, index) => (
                <div
                    key={index}
                    className={`max-w-[20%] px-5 py-3 rounded-2xl text-sm break-words whitespace-pre-wrap shadow-sm ${
                    message.SentReceived
                        ? 'ml-auto bg-indigo-600 text-white'
                        : 'mr-auto bg-gray-200 text-gray-900'
                    }`}
                >
                    {message.Text}
                </div>
                ))}
            </section>

            {/* TextBar */}
            <div className="p-4 border-t border-gray-200 bg-indigo-50 rounded-b-lg">
                <TextBar
                    chat={chat}
                    type={type}
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>
        </div>
    );
}
