import { useEffect, useState } from 'react';
import ChatList from './ChatList';
import Chat from './Chat/Chat';
import CallCard from './Chat/CallCard';
import ContactCard from './Chat/ContactCard';
import NewContact from './NewContact';
import NewChat from './NewChat';
import NewGroup from './NewGroup';

export default function MainPage(props) {
    const user = props.user;
    const setUser = props.setUser;

    const [chats, setChats] = useState([]);
    const [groups, setGroups] = useState([]);
    const [calls, setCalls] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [showedData, setShowedData] = useState('');

    const [chat, setChat] = useState(null);
    const [call, setCall] = useState(null);
    const [contact, setContact] = useState(null);

    const [sidebar, setSidebar] = useState(true);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
                const chatsRes = await fetch('/api/chats');
                const groupsRes = await fetch('/api/groups');
                const callsRes = await fetch('/api/calls');
                const contactsRes = await fetch('/api/contacts');

                const chats = await chatsRes.json();
                const groups = await groupsRes.json();
                const calls = await callsRes.json();
                const contacts = await contactsRes.json();
                
                setChats(chats);
                setGroups(groups);
                setCalls(calls);
                setContacts(contacts);
                setShowedData('');
            }catch(err) {
                //
            }
        }

        fetchData();
    }, []);


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

    const getData = (type) => {
        switch (type) {
            case 'chats':
                return chats;
            case 'groups':
                return groups;
            case 'calls':
                return calls;
            case 'contacts':
                return contacts;
        }
    }

    const handleCreateAction = (e) => {
        e.preventDefault();
        const id = e.target.id;
        if(id === "sidebar") {
            setNewItem('');
            setSidebar(true);
        }else{
            setSidebar(false);
            setNewItem(id);
        }
    }

    return (
        <div className="h-screen w-screen flex bg-gray-100 text-gray-900 ">
        <aside className="w-[10%] bg-white p-6 overflow-y-auto shadow-lg rounded-l-lg">
            <button id="sidebar" className="w-12 h-12 rounded-full overflow-hidden bg-indigo-300 flex items-center justify-center text-white text-lg font-semibold hover:bg-indigo-200 transition mt-3" onClick={(e) => handleCreateAction(e)}>
                ☰
            </button>
            <button id="newContact" className="w-12 h-12 rounded-full overflow-hidden bg-indigo-300 flex items-center justify-center text-white text-lg font-semibold hover:bg-indigo-200 transition mt-3" onClick={(e) => handleCreateAction(e)}>
                👤
            </button>
            <button id="newChat" className="w-12 h-12 rounded-full overflow-hidden bg-indigo-300 flex items-center justify-center text-white text-lg font-semibold hover:bg-indigo-200 transition mt-3" onClick={(e) => handleCreateAction(e)}>
                💬
            </button>
            <button id="newGroup" className="w-12 h-12 rounded-full overflow-hidden bg-indigo-300 flex items-center justify-center text-white text-lg font-semibold hover:bg-indigo-200 transition mt-3" onClick={(e) => handleCreateAction(e)}>
                👥
            </button>
        </aside>
        {/* Sidebar */}
        {sidebar && (
        <aside className="w-[45%] bg-white p-6 flex flex-col justify-between shadow-lg">
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
                    onClick={() => setShowedData(type)}
                    className="w-full text-left px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition"
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
                ))}
            </section>
            </div>

            <div className="overflow-y-auto flex-1 mt-6">
                {showedData !== '' && <ChatList
                    data={getData(showedData)}
                    type={showedData}
                    chat={chat}
                    setChat={setChat}
                    call={call}
                    setCall={setCall}
                    setContact={setContact}
                />}
            </div>
        </aside>
        )}

        {/* New item area */}
        {(newItem == 'newContact')? (
            <NewContact user={user} type={showedData}/>
        ) : (newItem == 'newChat')? (
            <NewChat contacts={contacts} user={user}/>
        ) : (
            <NewGroup contacts={contacts}/>
        )}
        
        {/* Chat area */}
        <main className="w-[100%] bg-white border-x border-gray-200 overflow-y-auto flex flex-col shadow-inner rounded-r-lg">
            {chat && <Chat chat={chat} type={showedData} />}
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
