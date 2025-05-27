
class Chat {
    
    constructor(containerId, messages) {
        this.containerId = containerId;
        this.messages = messages;
        this.loadChat();
    }

    loadChat() {
        const container = document.getElementById(this.containerId);

        this.messages.forEach(message => {
            const div = document.createElement("div");
            if(message.Sent) div.setAttribute("class","message sent");
            else div.setAttribute("class","message received");
            div.innerText = message.Text;
            container.appendChild(div);
        });
    }
}