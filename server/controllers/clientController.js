const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');
const generateToken = require('../utils/generateToken');

// @desc    Register new client
// @route   POST /api/clients/register
// @access  Public

    // name: 'Alice',
    // email: 'alice@example.com',
    // address: 'House on house',
    // city: 'Portland',
    // state: 'OR',
    // zip: '02313',
    // cell: '1234561212',
    // allergies: 'No allergies',
    // birthday: '1002'

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


module.exports = { registerClient, getAllClients };
