const AuthRepository = require('../auth/auth-repository')
const Customer = require('./customer')
const CustomerRepository = require('./customer-repository')

module.exports = {
    async addCustomerDataPart1(req, res) {
        const authRepo = new AuthRepository()
        const customerRepo = new CustomerRepository()

        try {
            const { userID, name, birthDate, city, phoneNumber, profilePicture } = req.body

            const existingUser = await authRepo.findUserById(userID)
            if (!existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist"
                })
            }
            else if (existingUser.isVerified == "completed") {
                return res.status(400).json({
                    success: false,
                    message: "User already verified"
                })
            }

            const newCustomer = new Customer(userID, name, birthDate, city, phoneNumber, profilePicture, [])
            await customerRepo.create(newCustomer)

            await authRepo.updateUser(userID, {
                isVerified: "in-progress"
            })
            
            return res.status(200).json({
                success: true,
                message: "Customer data part 1 created successfully",
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    async addCustomerDataPart2(req, res) {
        const authRepo = new AuthRepository()
        const customerRepo = new CustomerRepository()

        try {
            const { userID, skills } = req.body

            const existingUser = await authRepo.findUserById(userID)
            if (!existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist"
                })
            }
            else if (existingUser.isVerified == "completed") {
                return res.status(400).json({
                    success: false,
                    message: "User already verified"
                })
            }

            await customerRepo.updateCustomerByUserID(userID, {
                skills: skills
            })

            await authRepo.updateUser(userID, {
                isVerified: "completed"
            })
            
            return res.status(200).json({
                success: true,
                message: "Customer data part 2 created successfully",
            })
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}