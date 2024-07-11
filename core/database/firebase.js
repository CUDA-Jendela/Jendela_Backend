const admin = require('firebase-admin')
const databaseConfig = require('../config/database-config')

admin.initializeApp({
    credential: admin.credential.cert(databaseConfig),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
})

module.exports = admin.firestore();