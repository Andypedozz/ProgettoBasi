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

// GET all Chats for current logged User
app.get("/chats", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }

    const chatsQuery = "SELECT * FROM Chat WHERE ChatOwner = ?";
    
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

app.post("/addMessage", async (req, res) => {
    const message = req.body;

    const maxIdQuery = "SELECT max(MessageId) as maxId FROM Message";
    const addMessageQuery = message.ChatId
        ? "INSERT INTO Message (Text, Read, Pinned, Datetime, SentReceived, ChatId, MessageId) VALUES (?, ?, ?, ?, ?, ?, ?)"
        : "INSERT INTO Message (Text, Read, Pinned, Datetime, SentReceived, GroupId, MessageId) VALUES (?, ?, ?, ?, ?, ?, ?)";

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

app.post("/signup", async (req, res) => {

    const user = req.body;
    const values = Object.values(user); 
    const query = "INSERT INTO User (Username, Name, Surname, Number) VALUES (?,?,?,?)";

    try{
        await execute(db, query, values);
        res.json(user);
    }catch(err) {
        console.error("Errore durante l'inserimento dell'utente: "+err);
        res.status(500).json({ error: err.message});
    }
})

// GET all Calls for current logged User
app.get("/calls", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }
    
    const callsQuery = "SELECT * FROM Call WHERE CallOwner = ?";
    
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
    
    const contactsQuery = "SELECT * FROM Contact WHERE ContactId IN (SELECT ContactId FROM Chat WHERE ChatOwner = ?);"
    try{
        const contacts = await fetchAll(db, contactsQuery, [user.Username]);
        return res.json(contacts);
    }catch(err) {
        return res.json({ error: err})
    }
});

app.post("/createContact", (req, res) => {

});

app.post("/createChat", (req, res) => {
    const contact = req.body;
});

app.post("/createGroup", (req, res) => {

});

app.post("/protocol/walk", (req, res) => {
    
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


app.post("/logout", (req, res) => {
    req.session.user = null;
    return res.json({ message: "Disconnesso"});
})

app.listen(port, () => {
    console.log("Server active on port: "+port);
})