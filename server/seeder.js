const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const users = [
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
    // Clear existing users
    await User.deleteMany();

    // Insert test users
    for (const user of users) {
      await User.create(user);
    }

    console.log('Test users added!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();