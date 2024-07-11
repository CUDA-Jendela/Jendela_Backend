const businessController = require('./business-controller')
const router = require('express').Router()

router.post('/business', businessController.addBusinessData)

module.exports = router