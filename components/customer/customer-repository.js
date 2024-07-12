const db = require('../../core/database/firebase')

class CustomerRepository {
    constructor() {
        this.collection = db.collection('customers')
    }

    async create(customer) {
        const result = await this.collection.add({
            userID: customer.userID,
            name: customer.name,
            birthDate: customer.birthDate,
            city: customer.city,
            phoneNumber: customer.phoneNumber,
            profilePicture: customer.profilePicture,
        })

        return result
    }
}

module.exports = CustomerRepository