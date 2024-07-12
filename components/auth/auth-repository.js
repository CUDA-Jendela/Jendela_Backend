const db = require('../../core/database/firebase')

class AuthRepository {
    constructor() {
        this.collection = db.collection('users')
    }

    async createUser(user) {
        const userRef = await this.collection.add(user);
        return userRef;
    }

    async findUserByEmail(email) {
        const snapshot = await this.collection
            .where("email", "==", email)
            .get();
        if (snapshot.empty) {
            return null;
        }
        const user = snapshot.docs[0].data();
        user.id = snapshot.docs[0].id;
        return user;
    }

    async updateUser(id, update) {
        await this.collection.doc(id).update(update);
    }

    async deleteUser(id) {
        await this.collection.doc(id).delete();
    }

    async findUserById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    }
}

module.exports = AuthRepository;
