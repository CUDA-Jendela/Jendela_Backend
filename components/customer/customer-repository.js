const db = require("../../core/database/firebase");

class CustomerRepository {
    constructor() {
        this.collection = db.collection("customers");
    }

    async create(customer) {
        const result = await this.collection.add({
            userID: customer.userID,
            name: customer.name,
            birthDate: customer.birthDate,
            city: customer.city,
            phoneNumber: customer.phoneNumber,
            profilePicture: customer.profilePicture,
            skills: customer.skills
        });

        return result;
    }

    async findCustomerByUserID(userID) {
        const snapshot = await this.collection
            .where("userID", "==", userID)
            .get();
        if (snapshot.empty) {
            return null;
        }
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }

    async updateCustomerByUserID(userID, updateData){
        const snapshot = await this.collection
            .where("userID", "==", userID)
            .get();
        if (snapshot.empty) {
            return null;
        }
        
        await snapshot.docs[0].ref.update(updateData)
    }
}

module.exports = CustomerRepository;
