const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthRepository = require("./auth-repository");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = {
    async connect(req, res) {
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
                isVerified: false,
            };
            const userRef = await authRepo.createUser(newUser);
            const token = jwt.sign(
                {
                    id: userRef.id,
                    email: newUser.email,
                    role: newUser.role,
                    isVerified: newUser.isVerified
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                token
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        const repo = new Repository();

        try {
            const user = await repo.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
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
    }
};
