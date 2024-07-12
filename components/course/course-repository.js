const db = require('../../core/database/firebase')

class CourseRepository {
    constructor() {
        this.collection = db.collection('courses')
    }

    async create(course) {
        const result = await this.collection.add({
            ngoID: course.ngoID,
            name: course.name,
            description: course.description,
            skills: course.skills,
            quota: course.quota,
            startDate: course.startDate,
            endDate: course.endDate
        });

        return result;
    }

    async findAll() {
        const snapshot = await this.collection.get();

        const courses = [];
        snapshot.forEach(doc => {
            courses.push({
                id: doc.id,
                ...doc.data()
            })
        })

        return courses;
    }

    async findByID(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id, 
            ...doc.data()
        }
    }
}

module.exports = CourseRepository;