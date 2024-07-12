const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const serverConfig = require("./config/server-config");
const db = require("./database/firebase");

const authApis = require("../components/auth/auth-api");
const customerApis = require("../components/customer/customer-api");
const businessApis = require("../components/business/business-api");
const ngoApis = require("../components/ngo/ngo-api");
const enrollmentApis = require("../components/course-enrollment/course-enrollment-api");
const skillApis = require("../components/skills/skill-api");
const chatApis = require("../components/chat/chat-api")

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

        // User and auth apis
        this.express.use("/api", authApis);

        // Customer apis
        this.express.use("/api", customerApis);

        // Business apis
        this.express.use("/api", businessApis);

        // NGO apis
        this.express.use("/api", ngoApis);

        // Course Enrollment apis
        this.express.use("/api", enrollmentApis);

        // Skill apis
        this.express.use("/api", skillApis);

        // Chat apis
        this.express.use("/api", chatApis);
    }

    getDatabase() {
        return this.db;
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
