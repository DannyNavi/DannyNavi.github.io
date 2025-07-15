const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Client = require('./models/Client');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const clients = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    password: '123456',
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    password: '123456',
  },
  {
    name: 'Charlie',
    email: 'charlie@example.com',
    password: '123456',
  },
];

const importData = async () => {
  try {
    // Clear existing clients
    await Client.deleteMany();

    // Insert test clients
    for (const client of clients) {
      await Client.create(client);
    }

    console.log('Test clients added!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();