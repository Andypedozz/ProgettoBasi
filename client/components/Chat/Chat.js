
export default class Chat {
    
    constructor(containerId, name, type, messages) {
        this.containerId = containerId;
        this.name = name;
        this.messages = messages;
        this.type = type;
        this.loadChat();
        this.loadTextBar();
    }

    loadChat() {
        const container = document.getElementById(this.containerId);

        const chatHeader = document.createElement("div");
        chatHeader.setAttribute("class","chat-header");
        const h3 = document.createElement("h3");
        h3.innerText = this.name;
        chatHeader.appendChild(h3);
        container.appendChild(chatHeader);

        const chatMessagesDiv = document.createElement("div");
        chatMessagesDiv.setAttribute("class","chat-messages");
        
        this.messages.forEach(message => {
            const div = document.createElement("div");
            if(this.type == "groups") {
                const avatarDiv = document.createElement("div");
                avatarDiv.setAttribute("class","message-avatar");
                avatarDiv.innerText = "A";
                div.appendChild(avatarDiv);
            }
            if(message.SentReceived) div.setAttribute("class","message sent");
            else div.setAttribute("class","message received");
            div.innerText = message.Text;
            chatMessagesDiv.appendChild(div);
        });

        container.appendChild(chatMessagesDiv);

    }
    
    loadTextBar() {
        const container = document.getElementById(this.containerId);
        const textBarDiv = document.createElement("div");
        const span1 = document.createElement("span");
        span1.innerText = "insert_emoticon";
        span1.setAttribute("class","material-icons icon");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Scrivi un messaggio...";
        const span2 = document.createElement("span");
        span2.setAttribute("class","material-icons icon");
        span2.innerText = "send";
        textBarDiv.setAttribute("class","textBarDiv");

        textBarDiv.appendChild(span1);
        textBarDiv.appendChild(input);
        textBarDiv.appendChild(span2);
        container.appendChild(textBarDiv);
    }

}