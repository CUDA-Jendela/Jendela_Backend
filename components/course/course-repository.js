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
}

module.exports = CourseRepository;