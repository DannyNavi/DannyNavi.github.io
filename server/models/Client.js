const mongoose = require('mongoose');

const permDetailsSchema = new mongoose.Schema({
  hairCondition: { type: Number, min: 1, max: 10, required: true },
  scalpCondition: { type: Number, min: 1, max: 10, required: true },
  porosity: {
    type: String,
    enum: ["extra porous", "porous", "normal"],
    required: true,
  },
  type: {
    type: String,
    enum: ["exothermic", "acid", "alkaline"],
    required: true,
  },
}, { _id: false });

const dyeDetailsSchema = new mongoose.Schema({
  hairCondition: { type: Number, min: 1, max: 10, required: true },
  scalpCondition: { type: Number, min: 1, max: 10, required: true },
  porosity: {
    type: String,
    enum: ["extra porous", "porous"],
    required: true,
  },
  type: {
    type: String,
    enum: ["exothermic", "acid", "alkaline"],
    required: true,
  },
  colorTreatment: {
    type: [String],
    enum: [
      "semi permanent",
      "toned",
      "highlights",
      "lowlights",
      "bleached",
      "henna base",
      "other"
    ],
    default: [],
  },
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // 🔗 link to Client model
    required: true,
  },
  type: {
    type: String,
    enum: ["wax", "perm", "dye"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comments: {
    type: String,
    default: "",
  },
  treatmentTypes: {
    type: [String],
    default: [],
  },
  permDetails: {
    type: permDetailsSchema,
    required: function () {
      return this.type === "perm";
    },
  },
  dyeDetails: {
    type: dyeDetailsSchema,
    required: function () {
      return this.type === "dye";
    },
  },
}, {
  timestamps: true,
});


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
const Service = mongoose.model("Service", serviceSchema)
module.exports = Service
module.exports = Client;
