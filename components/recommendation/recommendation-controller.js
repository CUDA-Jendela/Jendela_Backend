const CustomerRepository = require('../customer/customer-repository')
const CourseRepository = require('../course/course-repository')
const NGORepository = require('../ngo/ngo-repository')
const checkSimilarities = require('./recommendation-algorithm')

module.exports = {
    async customerRecommendation(req, res) {
        const customerRepo = new CustomerRepository();
        const courseRepo = new CourseRepository();
        const ngoRepo = new NGORepository();

        try {
            const { userID, role } = req.body

            if (role != "customer") {
                return res.status(401).json({
                    success: false,
                    message: "User not authorized",
                }); 
            }

            const existingCustomer = await customerRepo.findCustomerByUserID(userID)
            const courses = await courseRepo.findAll()

            const similaritiesResults = []
            for (let course of courses) {
                delete course.description;
                course.startDate = course.startDate.toDate().toISOString()
                course.endDate = course.endDate.toDate().toISOString()

                const ngo = await ngoRepo.getNGO(course.ngoID);
                const skillNames = [];
                for (let skillID of course.skills) {
                    const skillData = await skillRepo.findByID(skillID);
                    skillNames.push(skillData.name);
                }

                similaritiesResults.push({
                    ...course,
                    ngoName: ngo.name,
                    ngoCity: ngo.city,
                    skills: skillNames,
                    similarities: checkSimilarities(existingCustomer.skills, course.skills) + checkSimilarities([existingCustomer.city], [ngo.city])
                })
            }
            similaritiesResults.sort((a, b) => {
                b.similarities - a.similarities
            })

            if (similaritiesResults.length > 5) {
                similaritiesResults.splice(5);
            }

            for (let result of similaritiesResults) {
                delete result.similarities;
            }

            return res.status(200).json({
                success: true,
                message: "Course recommendation found successfully",
                data: similaritiesResults
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to find course recommendation"
            });
        }
    }
}