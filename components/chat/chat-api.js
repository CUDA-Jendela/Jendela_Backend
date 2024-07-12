const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/auth-middleware')
const chatController = require('./chat-controller')

router.get("/chat", authMiddleware, chatController.getChat)
router.post("/chat", authMiddleware, chatController.askQuestion)

module.exports = router