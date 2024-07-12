const AuthRepository = require("../auth/auth-repository")
const Business = require("./business")
const BusinessRepository = require("./business-repository")

module.exports = {
    async addBusinessData(req, res) {
        const authRepo = new AuthRepository()
        const businessRepo = new BusinessRepository()

        try {
            const { userID, name, industry, description, address, phoneNumber, logoPicture } = req.beforeDestroy()

            const existingUser = await authRepo.findUserById(userID)
            if (!existingUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }
            else if (existingUser.isVerified) {
                return res.status(400).json({
                    message: "User already verified"
                })
            }

            const newBusiness = new Business(userID, name, industry, description, address, phoneNumber, logoPicture)
            const result = await businessRepo.create(newBusiness)

            await authRepo.updateUser(userID, {
                isVerified: true
            })

            return res.status(200).json({
                success: true,
                data: result
            })
        }
        catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}