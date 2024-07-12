const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const serverConfig = require('./config/server-config')
const db = require('./database/firebase')

const authApis = require('../components/auth/auth-api')
const customerApis = require('../components/customer/customer-api')
const ngoApis = require("../components/ngo/ngo-api");

class Application {
    constructor() {
        this.express = express();
        this.serverConfig = serverConfig;
        this.db = db;
    }

    setupServer() {
        // Register service providers to app
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(express.json());

        // Register all api
        // Test api
        this.express.get("/", (req, res) => {
            res.send("Hello, world!");
        });
        
        this.express.use("/api", ngoApis);
        // User and auth apis
        this.express.use("/api", authApis)

        // Customer apis
        this.express.use("/api", customerApis)
    }

    getDatabase() {
        return this.db
    }

    run() {
        this.express.listen(this.serverConfig.port, () => {
            this.setupServer();
            console.log(this.db);
            console.log(
                `Server listening on http://localhost:${this.serverConfig.port}`
            );
        });
    }
}

module.exports = new Application();
