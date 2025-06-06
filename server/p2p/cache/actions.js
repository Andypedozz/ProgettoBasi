/**
 * Handlers
 *
 */

const HotCache = require('./hot_cache.js');


class HotCacheActionPerformer {
    constructor() {
        this.inMemoryCache = new HotCache();
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     * Body: 
     * {"key":"foo", "value":"bar"}
     */
    AddKeyValuePair(req, res) {
       let tel = req.body.key;
       let address = req.body.value;

       try {
            this.inMemoryCache.addNode(tel, address);
            res.status(201).json({ok: "Added Key-Value Pairs"});
       } catch (error) {
            res.status(500).json({err: error.message}); 
       }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     * endpoint parameter: 
     * /:key
     */
    GetNodeAddress(req, res) {
        let keyToSearch = req.params.key;

        try {
            let remoteAddr = this.inMemoryCache.getNode(keyToSearch);
            res.status(200).json({ok: remoteAddr});
        } catch (error) {
            res.status(500).json({err: error.message});
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * 
     * endpoint parameter:
     * /:key
     */
    DetachNode(req, res) {
        let keyToDelete = req.params.key;

        try {
            this.inMemoryCache.deleteNode(keyToDelete);
            res.status(200).json({ok: "Node Deleted!"});
        } catch(error) {
            res.status(500).json({err: error.message});
        }
    }

    SetNeighbor(req, res) {
        let keyDis = req.params.key;

        try {
            let n = this.inMemoryCache.assignNeighborhood(keyDis);
            res.status(200).json({ok: n});
        } catch (error) {
            res.status(500).json({err: error.message});
        }
    }
}

module.exports = HotCacheActionPerformer;