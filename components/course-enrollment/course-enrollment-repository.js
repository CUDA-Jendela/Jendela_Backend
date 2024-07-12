const db = require("../../core/database/firebase");

class CourseEnrollmentRepository {
    constructor() {
        this.collection = db.collection("course-enrollment");
    }

    async createEnrollment(enrollment) {
        const enrollmentRef = await this.collection.add(enrollment);
        return enrollmentRef;
    }

    async getEnrollment(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    }

    async getAllEnrollmentsByCustomer(customer_id) {
        const snapshot = await this.collection.where('customer_id', '==', customer_id).get();
        if (snapshot.empty) {
            return [];
        }
        const enrollments = [];
        snapshot.forEach((doc) =>
            enrollments.push({ id: doc.id, ...doc.data() })
        );
        return enrollments;
    }

    async updateEnrollment(id, updates) {
        await this.collection.doc(id).update(updates);
    }

    async deleteEnrollment(id) {
        await this.collection.doc(id).delete();
    }

    async findEnrollmentByCustomerAndCourse(customer_id, course_id) {
        const snapshot = await this.collection
            .where("customer_id", "==", customer_id)
            .where("couse_id", "==", course_id)
            .get();
        if (snapshot.empty) {
            return null;
        }
        return snapshot.docs[0].data();
    }
}

module.exports = CourseEnrollmentRepository;
