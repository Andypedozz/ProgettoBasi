

const httpRequsest = require('axios');
const axiosPerformer = httpRequsest.create({timeout: 10000});
const HEARTBEAT_ENDPOINT = "/heartbeat";

class Multicast {
    constructor() {
        this.suspiciousNodes = [];
    }

    multicast(addrList) {
        for (const addr in addrList) {
            axiosPerformer.get(HEARTBEAT_ENDPOINT)
            .then(respose => {
                // TODO
                this.suspiciousNodes.pop(addr);
            })
            .then(error => {
                // handling timeout error
                this.suspiciousNodes.push(addr);
            })

        }
    }

    get getSuspiciousNodeList() {
        return this.suspiciousNodes;
    }
}

module.exports = Multicast;