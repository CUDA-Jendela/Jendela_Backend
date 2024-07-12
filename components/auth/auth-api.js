const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth-middleware");
const authController = require("./auth-controller");

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get(
    "/user/me",
    authMiddleware.authMiddleware,
    authController.getMe
);

module.exports = router;
