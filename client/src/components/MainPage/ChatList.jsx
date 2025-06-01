import styles from './MainPage.module.css';

export default function ChatList({ data, type, setChat, setCall }) {
    const openItem = (item) => {
        if (type === 'chats' || type === 'groups') {
            setChat(item);
        } else {
            setCall(item);
        }
    };

    const getTitle = () => {
        switch (type) {
            case 'chats':
                return 'Chat';
            case 'groups':
                return 'Gruppi';
            case 'calls':
                return 'Chiamate';
            default:
                return 'Elementi';
        }
    };

    const getAvatar = (item) => {
        if (type === 'chats') return item.ChatName?.charAt(0).toUpperCase() || '?';
        if (type === 'groups') return item.GroupName?.charAt(0).toUpperCase() || '?';
        if (type === 'calls') return item.CallId;
        return '?';
    };

    const getLabel = (item) => {
        return item.ChatName || item.GroupName || `Call ${item.CallId}`;
    };

    return (
        <div className={styles.chatList}>
            <h3>{getTitle()}</h3>
            {data.map((item, index) => (
                <div
                    key={index}
                    className={styles.rowItem}
                    onClick={() => openItem(item)}
                >
                    <div className={styles.avatar}>{getAvatar(item)}</div>
                    <h3>{getLabel(item)}</h3>
                </div>
            ))}
        </div>
    );
}
