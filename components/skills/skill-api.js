const router = require('express').Router()
const skillController = require('./skill-controller')

router.post("/skill", skillController.addSkill)
router.delete("/skill", skillController.deleteSkill)

module.exports = router