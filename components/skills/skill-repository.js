const db = require('../../core/database/firebase')

class SkillRepository {
    constructor() {
        this.collection = db.collection('skills');
    }

    async create(skillName) {
        const result = await this.collection.add({
            name: skillName
        });

        return result;
    }

    async findByName(skillName) {
        const snapshot = await this.collection.where("name", "==", skillName).get()
        if (snapshot.empty) {
            return null;
        }

        const skill = snapshot.docs[0].data();
        return skill;
    }

    async delete(skillID) {
        await this.collection.doc(skillID).delete()
    }
}

module.exports = SkillRepository