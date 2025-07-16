const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Client = require('./models/Client');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const clients = [
  {
    name: 'Alidsace',
    email: 'alicsdade@example.com',
    address: 'House on house',
    city: 'Portland',
    state: 'OR',
    zip: '02313',
    cell: '1234561212',
    allergies: 'No allergies',
    birthday: '1004'

  },
  {
    name: 'Alisdasace',
    email: 'alice@examdsadple.com',
    address: 'House on ssshouse',
    city: 'Portland',
    state: 'OR',
    zip: '02313',
    cell: '1234561212',
    allergies: 'No allergies',
    birthday: '1002'
  },
  {
    name: 'Alisdasdace',
    email: 'alicesdadsa@example.com',
    address: 'House on ddhouse',
    city: 'Portland',
    state: 'OR',
    zip: '02313',
    cell: '1234561212',
    allergies: 'No allergies',
    birthday: '1006'
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