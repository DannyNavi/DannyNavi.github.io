const express = require('express');
const { registerClient, deleteClient, getAllClients, updateClient, getClientById, getClientFromPhone} = require('../controllers/clientController');
const router = express.Router();

router.post('/register', registerClient);

router.get('/', getAllClients); // GET /api/clients
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('getClientFromPhone/:cell', getClientFromPhone)

module.exports = router;
