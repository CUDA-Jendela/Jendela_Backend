const router = require('express').Router()
const customerController = require('./customer-controller')

router.post('/customer', customerController.addUserData)

module.exports = router