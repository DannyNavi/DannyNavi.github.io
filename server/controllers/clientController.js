const asyncHandler = require('express-async-handler');
const {Client} = require('../models/Models');
const generateToken = require('../utils/generateToken');

const registerClient = asyncHandler(async (req, res) => {
  const { name, email, address, city, state, zip, cell, allergies, birthday } = req.body;

  const clientExists = await Client.findOne({ email });
  if (clientExists) {
    res.status(400);
    throw new Error('client already exists');
  }

  const client = await Client.create({
    name,
    email,
    address,
    city,
    state,
    zip,
    cell,
    allergies,
    birthday
  });

  if (client) {
    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      address: client.address,
      city: client.city,
      state: client.state,
      zip: client.zip,
      cell: client.cell,
      allergies: client.allergies,
      birthday: client.birthday,
      token: generateToken(client._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid client data');
  }
});


const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});
  res.json(clients);
});

const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  res.json(client);
});

const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  // Loop through only fields you allow updating
  const allowedFields = [
    'email',
    'address',
    'city',
    'state',
    'zip',
    'cell',
    'allergies'
  ];

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined && req.body[field] !== '') {
      client[field] = req.body[field];
    }
  });

  const updatedClient = await client.save();
  res.json(updatedClient);
});

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  await Client.findByIdAndDelete(req.params.id); // ✅ fix
  res.json({ message: 'Client deleted' });
});


module.exports = { registerClient, getAllClients, updateClient, deleteClient, getClientById};
