const AuthRepository = require('../auth/auth-repository')
const Customer = require('./customer')
const CustomerRepository = require('./customer-repository')

module.exports = {
    async addCustomerData(req, res) {
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
            else if (existingUser.isVerified) {
                return res.status(400).json({
                    success: false,
                    message: "User already verified"
                })
            }

            const newCustomer = new Customer(userID, name, birthDate, city, phoneNumber, profilePicture)
            const result = await customerRepo.create(newCustomer)

            await authRepo.updateUser(userID, {
                isVerified: true
            })
            
            return res.status(200).json({
                success: true,
                result
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