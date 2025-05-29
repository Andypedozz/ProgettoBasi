/**
 * query flooding
 */

const routing = require("axios");
const res = require("express/lib/response");

const RETRY_FAIR_LOSS_LINK = 2;

class RandomWalkRouting {
    constructor(clusterManager, hostAccountInfo) {
        this.subNet = clusterManager;
        this.hostInfo = hostAccountInfo;
    }

    forwardMessage(message) {
        const destinationAddr = message.destination;
        if (destinationAddr != hostAccountInfo) {
            // list of neighbors
            const entries = this.subNet.getAll();

            // pick random neighbor
            const neighbor = this.#pickAtRandom(entries);

            const peerAddr = `http://${neighbor}/message`
            // make a POST request
            routing.post(peerAddr, message)
            .then(res => {
                console.log("Ack Message");
            })
            .catch(err => {
                // TODO => Retry Sys
            });
        } 
    }

    #pickAtRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
}

module.exports = RandomWalkRouting;