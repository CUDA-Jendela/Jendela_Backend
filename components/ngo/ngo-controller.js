const { error } = require("console");
const Repository = require("./ngo-repository");
const { messaging } = require("firebase-admin");

const createNGO = async (req, res) => {
    const {
        name,
        address,
        city,
        description,
        email,
        phoneNumber,
        logo,
        courses,
    } = req.body;
    const repo = new Repository();

    try {
        const newNGO = {
            name,
            address,
            city,
            email,
            description,
            phoneNumber,
            logo,
            courses,
        };
        const ngoRef = await repo.createNGO(newNGO);
        res.status(201).json({
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
    const repo = new Repository();

    try {
        const ngo = await repo.getNGO(id);
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
    const repo = new Repository();

    try {
        const ngos = await repo.getAllNGOs();
        res.status(200).json({ success: true, ngos });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateNGO = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const repo = new Repository();

    try {
        await repo.updateNGO(id, updates);
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
    const repo = new Repository();

    try {
        await repo.deleteNGO(id);
        res.status(200).json({
            success: true,
            message: "NGO deleted successfully",
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createNGO, getNGO, getAllNGOs, updateNGO, deleteNGO };
