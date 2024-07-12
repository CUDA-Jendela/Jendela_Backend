const SkillRepository = require('./skill-repository')

module.exports = {
    async addSkill(req, res) {
        const { skillName } = req.body;
        const skillRepo = new SkillRepository();

        try {
            const existingSkill = await skillRepo.findByName(skillName);
            if (existingSkill) {
                return res.status(400).json({
                    success: false,
                    message: "Skill already exist"
                });
            }

            const result = await skillRepo.create(skillName);
            
            return res.status(200).json({
                success: true,
                message: "Skill added successfully",
                result
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to add skill"
            });
        }
    },

    async deleteSkill(req, res) {
        const { skillID } = req.body;
        const skillRepo = new SkillRepository();

        try {
            await skillRepo.delete(skillID);
            return res.status(200).json({
                success: true,
                message: "Skill deleted successfully"
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete skill"
            });
        }
    }
}