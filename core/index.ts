import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as admin from "firebase-admin";
import serverConfig from './config/server-config'
import db from './database/firebase'

class Application {
    private express: Express;
    private serverConfig : any;
    private db: admin.firestore.Firestore;

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

    getDatabase() {
        return this.db
    }

    run() {
        this.express.listen(this.serverConfig.port, ()=> {
            this.setupServer();
            console.log(this.db)
            console.log(`Server listening on http://localhost:${this.serverConfig.port}`)
        })
    }
}

export default new Application();