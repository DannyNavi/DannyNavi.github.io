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

const Service = mongoose.model("Service", serviceSchema)

module.exports = Service
