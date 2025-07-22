const asyncHandler = require('express-async-handler');
const { Service, Client } = require('../models/Models');

// Create a service
const createService = asyncHandler(async (req, res) => {
  const { type, date, comments, client, permDetails, dyeDetails } = req.body;

  // Validate client exists
  const foundClient = await Client.findById(client);
  if (!foundClient) {
    res.status(400);
    throw new Error('Client not found');
  }

  const service = await Service.create({
    type,
    date,
    comments,
    client,
    permDetails,
    dyeDetails,
  });

  res.status(201).json(service);
});

// Get all services
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().populate('client', 'name email');
  res.json(services);
});

// Get service by ID
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id).populate('client');

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.json(service);
});

// Delete a service
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  await service.remove();
  res.json({ message: 'Service removed' });
});

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
};
