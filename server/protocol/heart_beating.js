
const SubNetContainer = require("./subnet.js");
const Multicast = require("./multicast.js");

class HeartBeating {
    constructor(clusterManger) {
        this.cluster = clusterManger;
        this.transport = new Multicast();
    }

    async startHeartBeating() {
        while (true) {
            await this.sleep(10000);
        
            let nodesToBeat = this.cluster.getNodes();

            await this.transport.multicast(nodesToBeat);
            let listToCheck = this.transport.getSuspiciousNodeList();

            for (const node of listToCheck) {
                let all = this.cluster.getAll();
                for (const tuple in all) {
                    if (tuple.value === node) {
                        this.cluster.deleteNeighbor(tuple.key);
                    }
                }
            }            
        }  
    }

    sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}

module.exports = HeartBeating;