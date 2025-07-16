const express = require('express');
const { registerClient, deleteClient, getAllClients } = require('../controllers/clientController');
const router = express.Router();

router.post('/register', registerClient);

router.get('/', getAllClients); // GET /api/clients
router.delete('/:id', deleteClient);

module.exports = router;
