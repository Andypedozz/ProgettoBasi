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
    }else{
        const chatsQuery = "SELECT * FROM Chat WHERE ChatOwner = ?";
        
        try{
            const chats = await fetchAll(db, chatsQuery, [user.Username]);
            return res.json(chats);
        }catch(err) {
            return res.json({ error: err})
        }
    }
});

// GET all messages for a single Chat
app.get("/chat/:chatId", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const chatId = req.params.chatId;
        const chatQuery = "SELECT * FROM Message WHERE ChatId = ?";
        
        try{
            const messages = await fetchAll(db, chatQuery, [chatId]);
            return res.json(messages);
        }catch(err) {
            return res.json({ error: err})
        }
    }
});

// GET all GroupChats for current logged User
app.get("/groups", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const groupsQuery = "SELECT * FROM GroupChat WHERE GroupOwner = ?";
        
        try{
            const groups = await fetchAll(db, groupsQuery, [user.Username]);
            return res.json(groups);
        }catch(err) {
            return res.json({ error: err})
        }
    }
});

// GET all messages for a single GroupChat
app.get("/group/:groupId", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const groupId = req.params.groupId;
        const groupQuery = "SELECT * FROM Message WHERE GroupId = ?";
        
        try{
            const group = await fetchAll(db, groupQuery, [groupId]);
            return res.json(group);
        }catch(err) {
            return res.json({ error: err})
        }
    }
})

/**
 * FIXME
 */
app.post("/addMessage", async (req, res) => {
    const message = req.body;
    const values = Object.values(message);

    const maxIdQuery = "SELECT max(MessageId) FROM Message";
    const addMessageQuery = "INSERT INTO Message ('MessageId','Text','Read','Pinned','ChatId','Datetime','SentReceived','GroupId') VALUES (?,?,?,?,?,?,?)";
    
    try{
        const maxId = await fetchAll(db, maxIdQuery);
        message.MessageId = maxId;
        await execute(db, addMessageQuery, [message]);
        return res.json({ message: "Successfully added message"});
    }catch(err) {
        return res.json({ error: err})
    }
});


// GET all Calls for current logged User
app.get("/calls", async (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const callsQuery = "SELECT * FROM Call WHERE CallOwner = ?";
        
        try{
            const calls = await fetchAll(db, callsQuery, [user.Username]);
            return res.json(calls);
        }catch(err) {
            return res.json({ error: err})
        }
    }
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