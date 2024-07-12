const AuthRepository = require("../auth/auth-repository");
const NGO = require("./ngo");
const NGORepository = require("./ngo-repository");

const createNGO = async (req, res) => {
    const ngoRepo = new NGORepository();
    const authRepo = new AuthRepository();

    try {
        const {
            userID,
            role,
            name,
            address,
            city,
            description,
            email,
            phoneNumber,
            logo,
            courses,
        } = req.body;

        if (role != "ngo") {
            return res.status(401).json({
                success: false,
                message: "User not authorized",
            });
        }

        const existingUser = await authRepo.findUserById(userID);
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        } else if (existingUser.isVerified == "completed") {
            return res.status(400).json({
                success: false,
                message: "User already verified",
            });
        }

        const newNGO = {
            userID,
            name,
            address,
            city,
            email,
            description,
            phoneNumber,
            logo,
            courses,
        };
        const ngoRef = await ngoRepo.createNGO(newNGO);

        await authRepo.updateUser(userID, {
            isVerified: "completed",
        });

        res.status(200).json({
            success: true,
            message: "NGO created successfully",
            ngoId: ngoRef.id,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getNGO = async (req, res) => {
    const { id } = req.params;
    const ngoRepo = new NGORepository();

    try {
        const ngo = await ngoRepo.getNGO(id);
        if (!ngo) {
            return res
                .status(404)
                .json({ success: false, message: "NGO not found" });
        }
        res.status(200).json({ success: true, ngo });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllNGOs = async (req, res) => {
    const ngoRepo = new NGORepository();

    try {
        const ngos = await ngoRepo.getAllNGOs();
        res.status(200).json({ success: true, ngos });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateNGO = async (req, res) => {
    const { id } = req.params;
    const { role, ...updates } = req.body;
    const ngoRepo = new NGORepository();

    try {
        if (role != "ngo") {
            return res.status(401).json({
                success: false,
                message: "User not authorized",
            });
        }
        await ngoRepo.updateNGO(id, updates);
        res.status(200).json({
            success: true,
            message: "NGO updated successfully",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteNGO = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const ngoRepo = new NGORepository();

    try {
        if (role != "ngo") {
            return res.status(401).json({
                success: false,
                message: "User not authorized",
            });
        }
        await ngoRepo.deleteNGO(id);
        res.status(200).json({
            success: true,
            message: "NGO deleted successfully",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createNGO, getNGO, getAllNGOs, updateNGO, deleteNGO };
