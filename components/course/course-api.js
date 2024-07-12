const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/auth-middleware')
const courseController = require('./course-controller')

router.post("/course", authMiddleware, courseController.addCourse)

module.exports = router