const asyncHandler = require('express-async-handler');
const {Client} = require('../models/Models');
const generateToken = require('../utils/generateToken');

const registerClient = asyncHandler(async (req, res) => {
  const { name, email, cell, allergies, birthday } = req.body;

  const clientExists = await Client.findOne({ cell });
  if (clientExists) {
    res.status(400);
    throw new Error('client already exists');
  }

  const client = await Client.create({
    name,
    email,
    cell,
    allergies,
    birthday
  });

  if (client) {
    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
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

const getClientFromPhone = async (req, res) => {
  try {
    const { cell } = req.params;
    const client = await Client.findOne({ cell }).select('_id');

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ clientId: client._id });
  } catch (error) {
    console.error('Error retrieving client ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerClient, getAllClients, updateClient, deleteClient, getClientById, getClientFromPhone};
