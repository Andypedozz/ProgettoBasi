const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3001;

let user;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/")));

const db = new sqlite3.Database("db/Project.db", (err) => {
    if(err) {
        console.log("Errore nella connessione al DB: "+err.message);
    }else{
        console.log("Connesso al database SQLite");
    }
});

app.get("/chats", (req, res) => {
    const chatsQuery = "SELECT * FROM Chat";
    
    db.all(chatsQuery, [], (err, chats) => {
        if(err) {
            res.status(500).json({ error: err.message});
            return;
        }
        
        console.log("Executed query: "+chatsQuery);
        res.json(chats);
    });
});

// GUI ENDPOINTS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"pages/login/login.html"));
});

app.get("/home", (req, res) => {
    if(user) {
        res.sendFile(path.join(__dirname,"pages/home/home.html"));
    }else{
        res.sendFile(path.join(__dirname,"pages/login/login.html"));
    }
})

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

app.listen(port, () => {
    console.log("Server active on port: "+port);
})
