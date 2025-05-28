const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3001;

// Currently logged user
let user;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));

const db = new sqlite3.Database("db/Project.db", (err) => {
    if(err) console.log("Errore nella connessione al DB: "+err.message); 
    else console.log("Connesso al database SQLite");     
});

// GET all Chats for current logged User
app.get("/chats", (req, res) => {
    if(user) {
        const chatsQuery = "SELECT * FROM Chat WHERE ChatOwner = ?";
        
        db.all(chatsQuery, user.Username, (err, chats) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(chats);
        });
    }else{
        res.redirect("/");
    }
});

app.get("/groups", (req, res) => {
    if(user) {
        const chatsQuery = "SELECT * FROM GroupChat WHERE GroupOwner = ?";
        
        db.all(chatsQuery, user.Username, (err, groups) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(groups);
        });
    }else{
        res.redirect("/");
    }
});

app.get("/calls", (req, res) => {
    if(user) {
        const chatsQuery = "SELECT * FROM Call WHERE CallOwner = ?";
        
        db.all(chatsQuery, user.Username, (err, calls) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
            
            res.json(calls);
        });
    }else{
        res.redirect("/");
    }
});

// GET all messages for a single Chat
app.get("/chat/:chatId", (req, res) => {
    if(user) {
        const chatId = req.params.chatId;
        const chatQuery = "SELECT * FROM Message WHERE ChatId = ?";
    
        db.all(chatQuery, chatId, (err, messages) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
    
            res.json(messages);
        });
    }else{
        res.redirect("/");
    }
});

// POST: Set the current logged user
app.post("/login", (req, res) => {
    const username = req.body.username;
    
    const query = `SELECT * FROM User WHERE Username = ?`;
    
    db.get(query, username, (err, row) => {
        if(err) {
            res.status(500).json({ error: err.message});
            return;
        }

        if(row) {
            user = row;
            res.redirect("/home");
        }else{
            res.redirect("/");
        }
    });

});

// GUI ENDPOINTS
app.get("/", (req, res) => {
    user = null;
    res.sendFile(path.join(__dirname,"pages/login/login.html"));
});

app.get("/home", (req, res) => {
    if(user) {
        res.sendFile(path.join(__dirname,"pages/home/home.html"));
    }else{
        res.sendFile(path.join(__dirname,"pages/login/login.html"));
    }
})

app.listen(port, () => {
    console.log("Server active on port: "+port);
})
