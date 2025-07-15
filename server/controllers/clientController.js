const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');
const generateToken = require('../utils/generateToken');

// @desc    Register new client
// @route   POST /api/clients/register
// @access  Public
const registerClient = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const clientExists = await Client.findOne({ email });
  if (clientExists) {
    res.status(400);
    throw new Error('client already exists');
  }

  const client = await Client.create({
    name,
    email,
    password,
  });

  if (client) {
    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid client data');
  }
});

// @desc    Authenticate client & get token
// @route   POST /api/clients/login
// @access  Public
const authClient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const client = await Client.findOne({ email });

  if (client && (await client.matchPassword(password))) {
    res.json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});
  res.json(clients);
});


module.exports = { registerClient, authClient, getAllClients };
