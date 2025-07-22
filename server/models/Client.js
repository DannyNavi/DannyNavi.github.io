const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: {
      type: String,
      required: true,
      match: /^\d{5}$/, // 5-digit ZIP code
    },
    cell: {
      type: String,
      required: true,
      match: /^[0-9\-+\s()]{7,15}$/, // phone number format
    },
    allergies: { type: String, required: false },
    birthday: {
      type: String,
      required: true,
      match: /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, // MM-DD format
    },
      services: [serviceSchema], // <<-- Add services array here
  },
  {
    timestamps: true,
  }
);


const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
