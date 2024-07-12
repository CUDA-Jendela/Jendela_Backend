const router = require('express').Router()
const recommendationController = require('./recommendation-controller')
const { authMiddleware } = require('../../middlewares/auth-middleware')

router.get("/recommendation/customer", authMiddleware, recommendationController.customerRecommendation)

module.exports = router