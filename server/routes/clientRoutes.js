const express = require('express');

const router = express.Router();
const { getAllClients } = require('../controllers/clientController');

router.get('/', getAllClients); // GET /api/clients

module.exports = router;
