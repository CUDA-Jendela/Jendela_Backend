const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/auth-middleware')
const customerController = require('./customer-controller')

router.post('/customer/1', authMiddleware, customerController.addCustomerDataPart1)
router.post('/customer/2', authMiddleware, customerController.addCustomerDataPart2)

module.exports = router