/**
 * Packet Listener
 */

const express = require('express');
const HotCacheActionPerformer = require('./actions.js');
const p2pProtocolCache = express();

const HOT_CACHE_PORT = 6065;

p2pProtocolCache.use(express.json());
p2pProtocolCache.use(express.urlencoded({ extended: true }));

let innerCache = new HotCacheActionPerformer();

p2pProtocolCache.post("/add", (req, res) => {
    console.log("Added a New Node")
    innerCache.AddKeyValuePair(req, res);
});

p2pProtocolCache.get("/search/:key", (req, res) => {
    innerCache.GetNodeAddress(req, res);
});

p2pProtocolCache.delete("/remove/:key", (req, res) => {
    innerCache.DetachNode(req, res);
})

p2pProtocolCache.get("/neighbor/:key", (req, res) => {
    innerCache.SetNeighbor(req, res);
})

p2pProtocolCache.listen(HOT_CACHE_PORT, () => {
    console.log("Tiny Distributed Cache ON...");
});