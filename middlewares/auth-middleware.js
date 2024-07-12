const { messaging } = require("firebase-admin");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const payload = jwt.verify(token, JWT_SECRET);
            if (roles.length && !roles.includes(payload.role)) {
                return res
                    .status(403)
                    .json({ success: false, message: "Forbidden" });
            }
            req.user = payload;
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }
    };
};

module.exports = authMiddleware;
