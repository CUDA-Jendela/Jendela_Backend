const express = require("express");
const ngoController = require("./ngo-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

const router = express.Router();

router.post("/NGO", authMiddleware.authMiddleware, ngoController.createNGO);
router.get("/getNGO/:id", authMiddleware.authMiddleware, ngoController.getNGO);
router.get("/getAllNGO", authMiddleware.authMiddleware, ngoController.getAllNGOs);
router.put("/NGO/:id", authMiddleware.authMiddleware, ngoController.updateNGO);
router.delete("/NGO/:id", authMiddleware.authMiddleware, ngoController.deleteNGO);

module.exports = router;
