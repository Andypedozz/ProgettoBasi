import { useState } from 'react';
import { formatDate, formatTime } from '../../utils';

export default function TextBar(props) {
    const chat = props.chat;
    const type = props.type;
    const messages = props.messages;
    const setMessages = props.messages;

    const [text, setText] = useState('');

    const handleSend = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const message = {
            Text: trimmed,
            Read: 0,
            Pinned: 0,
            Date: formatDate(),
            Time: formatTime(),
            SentReceived: 1,
            ...(type === 'chats' && { ChatId: chat.ChatId }),
            ...(type === 'groups' && { GroupId: chat.GroupId }),
            MediaPath : '',
            MessageType : 'text',
            PollTitle : '',
            AuthorId : null
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
        <div className="flex items-center gap-4 bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-300">
            <textarea
                className="flex-grow resize-none bg-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-28 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Scrivi un messaggio"
                rows={1}
            />
            <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 flex items-center justify-center transition shadow-md"
                onClick={handleSend}
                aria-label="Invia messaggio"
            >
                ➤
            </button>
        </div>
    );
}
