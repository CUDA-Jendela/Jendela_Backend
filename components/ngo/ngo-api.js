const express = require("express");
const ngoController = require("./ngo-controller");
const authMiddleware = require("../../middlewares/auth-middleware");

const router = express.Router();

router.post("/NGO", authMiddleware(["NGO"]), ngoController.createNGO);
router.get("/getNGO/:id", authMiddleware(["NGO"]), ngoController.getNGO);
router.get("/getAllNGO", authMiddleware(["NGO"]), ngoController.getAllNGOs);
router.put("/NGO/:id", authMiddleware(["NGO"]), ngoController.updateNGO);
router.delete("/NGO/:id", authMiddleware(["NGO"]), ngoController.deleteNGO);

module.exports = router;
