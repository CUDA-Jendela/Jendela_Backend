const router = require('express').Router()
const customerController = require('./customer-controller')

router.post('/customer/1', customerController.addCustomerDataPart1)
router.post('/customer/2', customerController.addCustomerDataPart2)

module.exports = router