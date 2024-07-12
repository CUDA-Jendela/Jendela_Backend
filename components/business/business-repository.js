const db = require("../../core/database/firebase");

class BusinessRepository {
    constructor() {
        this.collection = db.collection("businesses");
    }

    async create(business) {
        const result = await this.collection.add({
            userID: business.userID,
            name: business.name,
            industry: business.industry,
            description: business.description,
            address: business.address,
            phoneNumber: business.phoneNumber,
            logoPicture: business.logoPicture,
        });

        return result;
    }

    async findBusinessByUserID(user_id) {
        const snapshot = await this.collection
            .where("user_id", "==", user_id)
            .get();
        if (snapshot.empty) {
            return null;
        }
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
}

module.exports = BusinessRepository;
