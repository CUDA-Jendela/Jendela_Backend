import admin from "firebase-admin";
import databaseConfig from '../config/database-config'

admin.initializeApp({
    credential: admin.credential.cert(databaseConfig as admin.ServiceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
})

export default admin.firestore();