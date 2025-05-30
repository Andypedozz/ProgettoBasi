
import Chat from "../../components/Chat/Chat.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";

// Function to fetch chats
function addListeners() {
    const btns = [
        { "chats": document.getElementById("chats-btn") },
        { "groups": document.getElementById("groups-btn") },
        { "calls": document.getElementById("calls-btn") }
    ];

    btns.forEach(item => {
        const [name, btn] = Object.entries(item)[0];
        if (btn) {
            btn.addEventListener("click", () => {
                fetchData(name);
            });
        }
    });
}


function fetchData(type) {
    clearSidebar();
    
    const url = "/"+type;
    fetch(url, {
        method : "GET"
    })
    .then(response => response.json())
    .then(data => {
        const sidebar = new Sidebar("chat-list",type,data);
        
        // Adding listeners to open single chats
        sidebar.cards.forEach(card => {
            card.addEventListener("click", (event) => {
                openChat(sidebar, type, card);
            });
        });
    })
}

function clearSidebar() {
    const sidebarContainer = document.getElementById("chat-list");
    sidebarContainer.innerHTML = "";
}

// Function to open a chat
function openChat(sidebar, type, card) {
    const name = card.getElementsByTagName("h4")[0].innerText;
    const data = sidebar.getChatData(name);
    const url = (type == "chats")? "/chat/"+data.ChatId : "/group/"+data.GroupId;

    clearArea();
    fetch(url, {
        method : "GET"
    })
    .then(response => response.json())
    .then(messages => {
        const chat = new Chat("chat-area", name, type, messages);
    });
}

// Function to clear the current opened chat container
function clearArea() {
    const chatContainer = document.getElementById("chat-area");
    chatContainer.innerHTML = "";
}

addListeners();