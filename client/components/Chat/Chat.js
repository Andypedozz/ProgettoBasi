
export default class Chat {
    
    constructor(containerId, name, type, messages) {
        this.containerId = containerId;
        this.name = name;
        this.messages = messages;
        this.type = type;
        this.loadChat();
        this.loadTextBar();
    }

    createElement(tag, className = "", textContent = "") {
        const el = document.createElement(tag);
        el.className = className;
        el.innerText = textContent;
        return el;
    }

    loadChat() {
        const container = document.getElementById(this.containerId);

        const chatHeader = this.createElement("div","chat-header");
        const h3 = this.createElement("h3","",this.name);
        chatHeader.appendChild(h3);
        container.appendChild(chatHeader);

        const chatMessagesDiv = this.createElement("div","chat-messages");
        
        this.messages.forEach(message => {
            const div = this.createElement("div");
            if(message.SentReceived) div.setAttribute("class","message sent");
            else div.setAttribute("class","message received");

            if(this.type == "groups") {
                const avatarDiv = this.createElement("div","message-avatar");
                avatarDiv.innerText = "A";
                div.appendChild(avatarDiv);
            }
            div.innerText = message.Text;
            chatMessagesDiv.appendChild(div);
        });

        container.appendChild(chatMessagesDiv);

    }
    
    loadTextBar() {
        const container = document.getElementById(this.containerId);
        const textBarDiv = this.createElement("div","textBarDiv");
        const span1 = this.createElement("span","material-icons icon","insert_emoticon");
        const input = this.createElement("input");
        input.type = "text";
        input.placeholder = "Scrivi un messaggio...";
        const span2 = this.createElement("span","material-icons icon","send");

        textBarDiv.appendChild(span1);
        textBarDiv.appendChild(input);
        textBarDiv.appendChild(span2);
        container.appendChild(textBarDiv);
    }

}