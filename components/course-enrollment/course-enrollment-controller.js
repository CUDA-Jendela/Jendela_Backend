const { messaging } = require("firebase-admin");
const CourseEnrollmentRepository = require("./course-enrollment-repository");
const CustomerRepository = require("../customer/customer-repository");

const createEnrollment = async (req, res) => {
    const { customer_id, course_id, score, review } = req.body;
    const repo = new CourseEnrollmentRepository();

    try {
        const existingEnrollment = await repo.findEnrollmentByCustomerAndCourse(
            customer_id,
            course_id
        );
        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "Enrollment already exists",
            });
        }

        const newEnrollment = {
            customer_id,
            course_id,
            score: score || null,
            review,
        };

        const enrollmentRef = await repo.createEnrollment(newEnrollment);
        res.status(201).json({
            success: true,
            message: "Course enrollment created successfully",
            enrollmentId: enrollmentRef.id,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getEnrollment = async (req, res) => {
    const { id } = req.params;
    const repo = new CourseEnrollmentRepository();

    try {
        const enrollment = await repo.getEnrollment(id);
        if (!enrollment) {
            return res
                .status(404)
                .json({ success: false, message: "Enrollment not found" });
        }
        res.status(200).json({ success: true, enrollment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllEnrollments = async (req, res) => {
    const userID = req.body.userID;
    const repo = new CourseEnrollmentRepository();
    const customerRepo = new CustomerRepository();

    try {
        const customer = await customerRepo.find;
        if (!customer) {
            return res
                .status(404)
                .json({ success: false, message: "Customer not found" });
        }

        const enrollments = await repo.getAllEnrollmentsByCustomer(customer_id);
        res.status(200).json({ success: true, enrollment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateEnrollment = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const repo = new CourseEnrollmentRepository();

    try {
        await repo.updateEnrollment(id, updates);
        res.status(200).json({
            success: true,
            message: "Course enrollment updated successfully",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteEnrollment = async (req, res) => {
    const { id } = req.params;
    const repo = new CourseEnrollmentRepository();

    try {
        await repo.deleteEnrollment(id);
        res.status(200).json({
            success: true,
            message: "Course enrollment deleted successfully",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    createEnrollment,
    getEnrollment,
    getAllEnrollments,
    updateEnrollment,
    deleteEnrollment,
};
