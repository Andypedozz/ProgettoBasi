
class Sidebar {

    constructor(containerId, chatsData = []) {
        this.containerId = containerId;
        this.chats = chatsData;
        this.cards = [];
        this.loadChats();
    }

    loadChats() {
        const container = document.getElementById(this.containerId);
        const chatList = document.createElement("div");
        chatList.setAttribute("class","chat-list");

        this.chats.forEach(chat => {
            const chatDiv = document.createElement("div");
            chatDiv.setAttribute("class", "chat-item");
            const chatInfo = document.createElement("div");
            chatInfo.setAttribute("class","chat-info");

            const h4 = document.createElement("h4");
            const p = document.createElement("p");

            h4.innerText = chat.ChatName;
            p.innerText = chat.lastMessage;

            chatInfo.appendChild(h4);
            chatInfo.appendChild(p);

            chatDiv.appendChild(chatInfo);
            chatList.appendChild(chatDiv)
            this.cards.push(chatDiv);
        });
        
        container.appendChild(chatList);
    }

    getChatData(name) {
        let found;
        this.chats.forEach(chat => {
            if(chat.ChatName == name) {
                found = chat;
            }
        })
        return found;
    }
}