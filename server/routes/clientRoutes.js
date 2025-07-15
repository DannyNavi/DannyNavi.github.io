const express = require('express');
const { registerClient, authClient } = require('../controllers/clientController');

const router = express.Router();
const { getAllClients } = require('../controllers/clientController');


router.post('/register', registerClient);
router.post('/login', authClient);

router.get('/', getAllClients); // GET /api/clients

module.exports = router;
