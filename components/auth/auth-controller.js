const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthRepository = require("./auth-repository");
const CustomerRepository = require("../customer/customer-repository");
const NGORepository = require("../ngo/ngo-repository");
const BusinessRepository = require("../business/business-repository");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    async register(req, res) {
        const { email, password, role } = req.body;
        const authRepo = new AuthRepository();

        try {
            const existingUser = await authRepo.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User already registered. Please login.",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                email,
                password: hashedPassword,
                role,
                isVerified: "pending",
            };
            const userRef = await authRepo.createUser(newUser);

            const token = jwt.sign(
                {
                    id: userRef.id,
                    email: newUser.email,
                    role: newUser.role,
                    isVerified: newUser.isVerified,
                },
                JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                token,
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        const repo = new AuthRepository();

        try {
            const user = await repo.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                },
                JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(200).json({ success: true, token });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    },

    async getMe(req, res) {
        const authRepo = new AuthRepository();
        const customerRepo = new CustomerRepository();
        const ngoRepo = new NGORepository();
        const businessRepo = new BusinessRepository();

        try {
            const role = req.body.role;
            const userID = req.body.userID;
            const user = await authRepo.findUserById(userID);
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: "User not found" });
            }

            let additionalData = {};

            if (role === "customer") {
                const customer = await customerRepo.findCustomerByUserID(
                    userID
                );
                console.log("customer", customer, userID);
                additionalData = { name: customer.name };
            } else if (user.role === "business") {
                const business = await businessRepo.findBusinessByUserID(
                    userID
                );
                additionalData = { name: business.name };
            } else if (user.role === "ngo") {
                const ngo = await ngoRepo.findNGOByUserID(userID);
                console.log("NGOID", ngo);
                additionalData = { name: ngo.name };
            }
            const response = {
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                username: user.username,
                ...additionalData,
            };
            res.status(200).json({ success: true, user: response });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
