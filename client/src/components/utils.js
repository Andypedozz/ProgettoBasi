export function getTitle(type) {
    switch (type) {
        case 'chats':
            return 'Chat';
        case 'groups':
            return 'Gruppi';
        case 'calls':
            return 'Chiamate';
        case 'contacts':
            return 'Contatti';
        default:
            return 'Elementi';
    }
};

export function getAvatar(item) {
    if (item.ContactName) return item.ContactName?.charAt(0).toUpperCase() || '?';
    if (item.GroupName) return item.GroupName?.charAt(0).toUpperCase() || '?';
    if (item.CallId) return item.CallId || '?';
    return '?';
};

export function getLabel(item) {
    return item.GroupName || item.ContactName || `Call ${item.CallId}`;
};

export function formatTime() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

export function formatDate() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}