
class Chat {
    
    constructor(containerId, type, messages) {
        this.containerId = containerId;
        this.messages = messages;
        this.type = type;
        this.loadChat();
        this.loadTextBar();
    }

    loadChat() {
        const container = document.getElementById(this.containerId);
        
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
            container.appendChild(div);
        });

    }
    
    loadTextBar() {
        const container = document.getElementById(this.containerId);
        const textBarDiv = document.createElement("div");
        textBarDiv.setAttribute("class","textBarDiv");

        container.appendChild(textBarDiv);
    }

}