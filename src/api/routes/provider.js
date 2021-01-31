const express = require('express')

const providerController = require('../controllers/provider')

const router = express.Router()

router.get('/', providerController.getProviders)
router.post('/', providerController.addProvider)
router.patch('/', providerController.updateProvider)
router.delete('/', providerController.deleteProvider)

module.exports = router