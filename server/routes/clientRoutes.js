const express = require('express');
const { registerClient} = require('../controllers/clientController');

const router = express.Router();
const { getAllClients } = require('../controllers/clientController');


router.post('/register', registerClient);

router.get('/', getAllClients); // GET /api/clients
router.delete('/:id', deleteClient);

module.exports = router;
