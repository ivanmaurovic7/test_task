const express = require('express')

const clientController = require('../controllers/client')

const router = express.Router()

router.get('/', clientController.getClients)
router.post('/', clientController.addClient)
router.patch('/', clientController.updateClient)
router.delete('/', clientController.deleteClient)

module.exports = router