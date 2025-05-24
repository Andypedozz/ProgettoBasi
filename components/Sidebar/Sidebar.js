
function Sidebar(containerId, chats = []) {
    const container = document.getElementById(containerId);
    const chatList = document.createElement("div");
    chatList.setAttribute("class","chat-list");

    chats.forEach(chat => {
        const chatDiv = document.createElement("div");
        chatDiv.setAttribute("class", "chat-item");
        const avatarDiv = document.createElement("div");
        avatarDiv.setAttribute("class","avatar");
        const chatInfo = document.createElement("div");
        chatInfo.setAttribute("class","chat-info");

        const h4 = document.createElement("h4");
        const p = document.createElement("p");

        h4.innerText = chat.ChatName;
        p.innerText = chat.lastMessage;

        chatInfo.appendChild(h4);
        chatInfo.appendChild(p);

        chatDiv.appendChild(avatarDiv);
        chatDiv.appendChild(chatInfo);
        chatList.appendChild(chatDiv)
    });
    
    container.appendChild(chatList);
}