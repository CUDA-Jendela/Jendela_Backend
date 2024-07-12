const express = require("express");
const ngoController = require("./ngo-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

const router = express.Router();

router.post("/ngo", authMiddleware.authMiddleware, ngoController.createNGO);
router.get("/ngo/:id", authMiddleware.authMiddleware, ngoController.getNGO);
router.get("/ngo/all", authMiddleware.authMiddleware, ngoController.getAllNGOs);
router.put("/ngo/:id", authMiddleware.authMiddleware, ngoController.updateNGO);
router.delete("/ngo/:id", authMiddleware.authMiddleware, ngoController.deleteNGO);

module.exports = router;
