const express = require("express");
const httpPerformer = require("axios");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const { json } = require("express/lib/response");
const SubNetContainer = require("./protocol/subnet.js");

//const { use } = require("react");

const app = express();
const port = 3001;

// well known endpoints
const HOT_CACHE_ADD = "http://localhost:6065/add";
const HOT_CACHE_NEIGHBOR = "http://localhost:6065/neighbor";

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

app.get("/group/:groupId", (req, res) => {
    if(user) {
        const groupId = req.params.groupId;
        const chatQuery = "SELECT * FROM Message WHERE GroupId = ?";
    
        db.all(chatQuery, groupId, (err, messages) => {
            if(err) {
                res.status(500).json({ error: err.message});
                return;
            }
    
            res.json(messages);
        });
    }else{
        res.redirect("/");
    }
})

app.post("/protocol/walk", (req, res) => {

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

            const host = ["localhost", port];

            const registrationMessage = {
                key: user,
                value: host.join(":"), 
            };
            // access to the Net
            httpPerformer.post(HOT_CACHE_ADD, JSON.stringify(registrationMessage));
            getNeighbors().then(neighbors => {
               let container = new SubNetContainer();
               let keyIndex = 0;
               for (const n of neighbors) {
                container.addNeighbor(++keyIndex, n);
               } 
            })

            // TODO => heart beating
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

async function getNeighbors() {
    let breaker = false;
    let neighbors;

    while (true) {
        await sleep(2000);

        httpPerformer.get(HOT_CACHE_NEIGHBOR)
        .then(res => {
            neighbors = res.data.ok;
           breaker = true; 
        })

        if (breaker)
            break;
    }

    return neighbors;
}

function sleep(timeToSleep) {
    return new Promise((resolve) => setTimeout(resolve, timeToSleep));
}
