const db = require('../../core/database/firebase')

class ChatRepository {
    constructor() {
        this.collection = db.collection('chats')
    }

    async findChatByUserID(userID) {
        const snapshot = await this.collection
            .where("userID", "==", userID)
            .get();
        if (snapshot.empty) {
            return null;
        }

        return {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data()
        };
    }

    async createChat(userID) {
        const result = await this.collection.add({
            userID: userID,
            chats: []
        })

        return result
    }

    async updateChatByUserID(userID, updateData){
        const snapshot = await this.collection
            .where("userID", "==", userID)
            .get();
        if (snapshot.empty) {
            return null;
        }
        
        await snapshot.docs[0].ref.update(updateData)
    }
}

module.exports = ChatRepository