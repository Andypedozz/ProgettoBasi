
export default class Sidebar {

    constructor(containerId, type, data = []) {
        this.containerId = containerId;
        this.type = type;
        this.data = data;
        this.cards = [];
        this.loadData();
    }

    createElement(tag, className = "", textContent = "") {
        const el = document.createElement(tag);
        el.className = className;
        el.innerText = textContent;
        return el;
    }

    loadData() {
        const container = document.getElementById(this.containerId);

        this.data.forEach(row => {
            const rowDiv = this.createElement("div","row-item");
            const rowInfo = this.createElement("div","row-info");

            const avatarDiv = this.createElement("div","avatar");
            
            const h4 = this.createElement("h4");
            const p = this.createElement("p");
            
            if(this.type == "chats") {
                avatarDiv.innerText = row.ChatName.charAt(0).toUpperCase();
                h4.innerText = row.ChatName;
            }else if(this.type == "groups") {
                h4.innerText = row.GroupName;
            }else{
                h4.innerText = "Call "+row.CallId;
            }
            
            rowInfo.appendChild(h4);
            rowInfo.appendChild(p);
            
            rowDiv.appendChild(avatarDiv);
            rowDiv.appendChild(rowInfo);
            container.appendChild(rowDiv)
            this.cards.push(rowDiv);
        });
    }
    
    getChatData(name) {
        let found;
        this.data.forEach(chat => {
            if(this.type == "chats") {
                if(chat.ChatName == name) {
                    found = chat;
                }
            }else{
                if(chat.GroupName == name) {
                    found = chat;
                }
            }
        })
        return found;
    }
}