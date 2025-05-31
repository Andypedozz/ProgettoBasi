const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const session = require("express-session");

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
app.get("/chats", (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const chatsQuery = "SELECT * FROM Chat WHERE ChatOwner = ?";
        
        db.all(chatsQuery, user.Username, (err, chats) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(chats);
        });
    }
});

// GET all GroupChats for current logged User
app.get("/groups", (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const groupsQuery = "SELECT * FROM GroupChat WHERE GroupOwner = ?";
        
        db.all(groupsQuery, user.Username, (err, groups) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(groups);
        });
    }
});

// GET all Calls for current logged User
app.get("/calls", (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const callsQuery = "SELECT * FROM Call WHERE CallOwner = ?";
        
        db.all(callsQuery, user.Username, (err, calls) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(calls);
        });
    }
});

// GET all messages for a single Chat
app.get("/chat/:chatId", (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const chatId = req.params.chatId;
        const chatQuery = "SELECT * FROM Message WHERE ChatId = ?";
        
        db.all(chatQuery, chatId, (err, messages) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(messages);
        });
    }
});

// GET all messages for a single GroupChat
app.get("/group/:groupId", (req, res) => {
    const user = req.session.user;
    if(!user) {
        return res.status(401).json({ error: "Non autorizzato"});
    }else{
        const groupId = req.params.groupId;
        const groupQuery = "SELECT * FROM Message WHERE GroupId = ?";
        
        db.all(groupQuery, groupId, (err, messages) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(messages);
        });
    }
})

app.post("/protocol/walk", (req, res) => {
    
});

// POST: Set the current logged user
app.post("/login", (req, res) => {
    
    const username = req.body.username;
    const usersQuery = "SELECT * FROM User WHERE Username = ?";

    db.get(usersQuery, username, (err, row) => {
        if(row) {
            req.session.user = row;
            res.json(row);
        }else{
            res.status(404).json({ error: "Utente non trovato"});
        }
    });
});

app.post("/logout", (req, res) => {
    req.session.user = null;
    return res.json({ message: "Disconnesso"});
})

app.listen(port, () => {
    console.log("Server active on port: "+port);
})