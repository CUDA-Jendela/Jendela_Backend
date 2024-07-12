const CourseRepository = require('./course-repository')
const NGORepository = require('../ngo/ngo-repository')
const SkillRepository = require('../skills/skill-repository')
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
                success: false,
                message: "Failed to create course"
            })
        }
    },

    async getCourseList(req, res) {
        const { role } = req.body;
        const courseRepo = new CourseRepository();
        const ngoRepo = new NGORepository();
        const skillRepo = new SkillRepository();

        if (role != "customer") {
            return res.status(401).json({
                success: false,
                message: "User not authorized",
            }); 
        }

        try {
            const courses = await courseRepo.findAll();
            
            for (let course of courses) {
                delete course.description;

                const ngo = await ngoRepo.getNGO(course.ngoID);
                course.ngoName = ngo.name;
                course.ngoCity = ngo.city;

                const skillNames = [];
                for (let skillID of course.skills) {
                    const skillData = await skillRepo.findByID(skillID);
                    skillNames.push(skillData.name);
                }
                course.skills = skillNames;
            }

            return res.status(200).json({
                success: true,
                message: "Course data retrieved successfully",
                data: courses,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve course data"
            });
        }
    },

    async getCourseLocations(req, res) {
        const { role } = req.body;
        const courseRepo = new CourseRepository();
        const ngoRepo = new NGORepository();

        if (role != "customer") {
            return res.status(401).json({
                success: false,
                message: "User not authorized",
            }); 
        }

        try {
            const courses = await courseRepo.findAll();
            
            const cities = [];
            for (let course of courses) {
                const ngo = await ngoRepo.getNGO(course.ngoID);
                if (!cities.includes(ngo.city)) {
                    cities.push(ngo.city);
                }
            }

            return res.status(200).json({
                success: true,
                message: "Course locations retrieved successfully",
                data: cities
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve course locations"
            });
        }
    }
}