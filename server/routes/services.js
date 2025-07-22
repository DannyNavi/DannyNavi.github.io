const express = require('express');
const router = express.Router();

const {
  getAllServices,
  createService,
  getServiceById,
  deleteService,
} = require('../controllers/serviceController');

// All services
router.route('/')
  .get(getAllServices)   // GET /api/services
  .post(createService);  // POST /api/services

// Individual service by ID
router.route('/:id')
  .get(getServiceById)   // GET /api/services/:id
  .delete(deleteService); // DELETE /api/services/:id

module.exports = router;
