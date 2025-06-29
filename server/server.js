const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const session = require("express-session");
const { fetchFirst, fetchAll, execute } = require("./db/db_wrapper.js"); 

const app = express();
const port = 3001;

app.use(express.json());
app.use(session({
    secret : "segretoSuperSicuro",
    resave : false,
    saveUninitialized : true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));

const db = new sqlite3.Database("server/db/Project.db", (err) => {
    if(err) console.log("Errore nella connessione al DB: "+err.message); 
    else console.log("Connesso al database SQLite");     
});

const formatDate = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// GET all Chats for current logged User
app.get("/chats", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }

    const chatsQuery = `SELECT Chat.ChatId, Contact.ContactName, Contact.ContactSurname, Contact.ContactNumber, Chat.CreationDate, 
                        Chat.Archived
                        FROM Chat INNER JOIN Contact ON Chat.ContactId = Contact.ContactId
                        WHERE Contact.ContactOwner = ?`;

    try{
        const chats = await fetchAll(db, chatsQuery, [user.Username]);
        return res.json(chats);
    }catch(err) {
        return res.json({ error: err})
    }
});

// GET all messages for a single Chat
app.get("/chat/:chatId", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }

    const chatId = req.params.chatId;
    const chatQuery = "SELECT * FROM Message WHERE ChatId = ?";
    
    try{
        const messages = await fetchAll(db, chatQuery, [chatId]);
        return res.json(messages);
    }catch(err) {
        return res.json({ error: err})
    }
});

// GET all GroupChats for current logged User
app.get("/groups", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }

    const groupsQuery = "SELECT * FROM GroupChat WHERE GroupOwner = ?";
    
    try{
        const groups = await fetchAll(db, groupsQuery, [user.Username]);
        return res.json(groups);
    }catch(err) {
        return res.json({ error: err})
    }
});

// GET all messages for a single GroupChat
app.get("/group/:groupId", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }

    const groupId = req.params.groupId;
    const groupQuery = "SELECT * FROM Message WHERE GroupId = ?";
    
    try{
        const group = await fetchAll(db, groupQuery, [groupId]);
        return res.json(group);
    }catch(err) {
        return res.json({ error: err})
    }
})

// GET all Calls for current logged User
app.get("/calls", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }
    
    const callsQuery = `SELECT Contact.ContactName, Call.*
                        FROM Contact, Call, Participation
                        WHERE Contact.ContactId = Participation.ContactId
                        AND Participation.CallId = Call.CallId
                        AND Contact.ContactOwner = ?;`
    
    try{
        const calls = await fetchAll(db, callsQuery, [user.Username]);
        return res.json(calls);
    }catch(err) {
        return res.json({ error: err})
    }
});

app.get("/contacts", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }
    
    const contactsQuery = "SELECT * FROM Contact WHERE ContactOwner = ?;"
    try{
        const contacts = await fetchAll(db, contactsQuery, [user.Username]);
        return res.json(contacts);
    }catch(err) {
        return res.json({ error: err})
    }
});

app.post("/addMessage", async (req, res) => {
    const message = req.body;

    const maxIdQuery = "SELECT max(MessageId) as maxId FROM Message";
    const addMessageQuery = message.ChatId
        ? "INSERT INTO Message (Text, Read, Pinned, Date, Time, SentReceived, ChatId, MediaPath, MessageType, PollTitle, AuthorId, MessageId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
        : "INSERT INTO Message (Text, Read, Pinned, Date, Time, SentReceived, GroupId, MediaPath, MessageType, PollTitle, AuthorId, MessageId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    try {
        const maxIdRow = await fetchFirst(db, maxIdQuery);
        const nextId = (maxIdRow.maxId || 0) + 1;
        message.MessageId = nextId;

        const values = Object.values(message);
        await execute(db, addMessageQuery, values);
        res.json({ message: "Successfully added message" });
    } catch (err) {
        console.error("Errore durante inserimento messaggio:", err);
        res.status(500).json({ error: err.message });
    }
});

// POST: Set the current logged user
app.post("/login", async (req, res) => {
    
    const username = req.body.username;
    const usersQuery = "SELECT * FROM User WHERE Username = ?";
    
    try{
        const user = await fetchFirst(db, usersQuery, [username]);
        if(user) {
            req.session.user = user;
            return res.json(user);
        }else{
            res.status(404).json({ error: "Utente non trovato"});
        }
    }catch(err) {
        return res.json({ error: err})
    }
});

app.post("/signup", async (req, res) => {

    const user = req.body;
    const values = Object.values(user); 
    const query = "INSERT INTO User (Username, Name, Surname, PhoneNumber) VALUES (?,?,?,?)";

    try{
        await execute(db, query, values);
        req.session.user = user;
        res.json(user);
    }catch(err) {
        console.error("Errore durante l'inserimento dell'utente: "+err);
        res.status(500).json({ error: err.message});
    }
})

app.post("/createContact", async (req, res) => {
    const contact = req.body;

    const maxIdQuery = "SELECT max(ContactId) as maxId FROM Contact";
    const addMessageQuery = "INSERT INTO Contact (ContactName, ContactSurname, ContactNumber, Blocked, Reported, ContactOwner, ContactId) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
        const maxIdRow = await fetchFirst(db, maxIdQuery);
        const nextId = (maxIdRow.maxId || 0) + 1;
        contact.ContactId = nextId;

        const values = Object.values(contact);
        await execute(db, addMessageQuery, values);
        res.json({ message: "Successfully added contact" });
    } catch (err) {
        console.error("Errore durante inserimento contatto:", err);
        res.status(500).json({ error: err.message });
    }
});



app.post("/createChat", async (req, res) => {
    const contact = req.body;

    const creationDate = formatDate();

    const chat = {
        CreationDate :  creationDate,
        Archived : 0,
        ContactId : contact.ContactId
    };

    const maxIdQuery = "SELECT max(ChatId) as maxId FROM Chat";
    const addChatQuery = "INSERT INTO Chat (CreationDate, Archived, ContactId, ChatId) VALUES (?, ?, ?, ?)";

    try {
        const maxIdRow = await fetchFirst(db, maxIdQuery);
        const nextId = (maxIdRow.maxId || 0) + 1;
        chat.ChatId = nextId;

        const values = Object.values(chat);
        await execute(db, addChatQuery, values);
        res.json({ message: "Successfully added chat" });
    } catch (err) {
        console.error("Errore durante inserimento chat:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post("/createGroup", (req, res) => {

});

app.post("/protocol/walk", (req, res) => {
    
});



app.post("/logout", (req, res) => {
    req.session.user = null;
    return res.json({ message: "Disconnesso"});
})

app.listen(port, () => {
    console.log("Server active on port: "+port);
})