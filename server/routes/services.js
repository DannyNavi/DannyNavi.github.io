const express = require('express');
const router = express.Router();
const {Client, Service} = require('../models/Models');

// POST /api/services
router.post('/', async (req, res) => {
  try {
    const {
      client,
      type,
      date,
      comments,
      treatmentTypes,
      permDetails,
      dyeDetails,
    } = req.body;

    // Optional: validate client exists
    const foundClient = await Client.findById(client);
    if (!foundClient) {
      return res.status(400).json({ error: 'Client not found' });
    }

    const newService = new Service({
      client,
      type,
      date,
      comments,
      treatmentTypes,
      permDetails: type === 'perm' ? permDetails : undefined,
      dyeDetails: type === 'dye' ? dyeDetails : undefined,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;