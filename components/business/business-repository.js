const app = require('../../core')

class BusinessRepository {
    constructor() {
        this.collection = app.getDatabase().collection('businesses')
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
        })

        return result
    }
}

module.exports = BusinessRepository