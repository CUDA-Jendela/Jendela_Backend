const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const serverConfig = require('./config/server-config')
const db = require('./database/firebase')

class Application {
    constructor() {
        this.express = express();
        this.serverConfig = serverConfig;
        this.db = db
    }

    setupServer() {
        // Register service providers to app
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json())

        // Register all api
        // Test api
        this.express.get("/", (req, res) => {
            res.send("Hello, world!");
        });
    }

    run() {
        this.express.listen(this.serverConfig.port, ()=> {
            this.setupServer();
            console.log(this.db)
            console.log(`Server listening on http://localhost:${this.serverConfig.port}`)
        })
    }
}

module.exports = new Application();