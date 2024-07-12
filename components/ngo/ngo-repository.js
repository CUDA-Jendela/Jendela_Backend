const db = require("../../core/database/firebase");

class NGORepository {
    constructor() {
        this.collection = db.collection("NGOs");
    }

    async createNGO(ngo) {
        const ngoRef = await this.collection.add(ngo);
        return ngoRef;
    }

    async getNGO(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    }

    async getAllNGOs() {
        const snapshot = await this.collection.get();
        if (snapshot.empty) {
            return [];
        }
        const ngos = [];
        snapshot.forEach((doc) => ngos.push({ id: doc.id, ...doc.data() }));
        return ngos;
    }

    async updateNGO(id, update) {
        await this.collection.doc(id).update(update);
    }

    async deleteNGO(id) {
        await this.collection.doc(id).delete();
    }

    async findNGOByUserID(userID) {
        const snapshot = await this.collection.where("userID", "==", userID).get();
        if (snapshot.empty) {
            return null;
        }
        
        const ngo = snapshot.docs[0].data();
        return ngo;
    }
}

module.exports = NGORepository;
