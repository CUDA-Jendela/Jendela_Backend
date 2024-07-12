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

    async findAll() {
        const snapshot = await this.collection.get();

        const skills = [];
        snapshot.forEach(doc => {
            skills.push({
                id: doc.id,
                ...doc.data()
            });
        })

        return skills;
    }

    async findByName(skillName) {
        const snapshot = await this.collection.where("name", "==", skillName).get()
        if (snapshot.empty) {
            return null;
        }

        const skill = snapshot.docs[0].data();
        return skill;
    }

    async findByID(skillID) {
        const doc = await this.collection.doc(skillID).get();
        if (!doc.exists) {
            return null;
        }

        return doc.data()
    }

    async delete(skillID) {
        await this.collection.doc(skillID).delete()
    }
}

module.exports = SkillRepository