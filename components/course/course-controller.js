const CourseRepository = require('./course-repository')
const NGORepository = require('../ngo/ngo-repository')
const Course = require('./course')

module.exports = {
    async addCourse(req, res) {
        const { userID, role, name, description, skills, quota, startDate, endDate } = req.body
        const ngoRepo = new NGORepository()
        const courseRepo = new CourseRepository()

        if (role != "ngo") {
            return res.status(401).json({
                success: false,
                message: "User not authorized",
            }); 
        }

        try {
            const ngo = await ngoRepo.findNGOByUserID(userID);
            const newCourse = new Course(ngo.id, name, description, skills, quota, new Date(startDate), new Date(endDate));
            
            const result = await courseRepo.create(newCourse);
            return res.status(200).json({
               success: true,
               message: "Course create successfully",
               result
            });
        }
        catch (error) {
            return res.status(500).json({
                success: true,
                message: "Failed to create course"
            })
        }
    }
}