const router = require('express').Router()
const customerController = require('./customer-controller')

router.post('/customer', customerController.addCustomerData)

module.exports = router