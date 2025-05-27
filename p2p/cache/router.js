/**
 * Packet Listener
 */

const express = require('express');
const p2pProtocolCache = express();

const HOT_CACHE_PORT = 6065;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let innerCache = new HotCacheActionPerformer();

p2pProtocolCache.post("/add", (req, res) => {
    innerCache.AddKeyValuePair(req, res);
});


p2pProtocolCache.get("/search/:key", (req, res) => {
    innerCache.GetNodeAddress(req, res);
});

p2pProtocolCache.delete("/remove/:key", (req, res) => {
    innerCache.DetachNode(req, res);
})

p2pProtocolCache.listen(HOT_CACHE_PORT, () => {
    console.log("Tiny Distributed Cache ON...");
});
