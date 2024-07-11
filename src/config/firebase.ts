import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as serviceAccount from "./cuda-jendela-firebase-adminsdk-mx69c-8773d17152.json";

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

export { admin };
