const mongoose = require('mongoose');

// --- Service Detail Schemas ---
const permDetailsSchema = new mongoose.Schema({
  hairCondition: { type: Number, min: 1, max: 10, required: true },
  scalpCondition: { type: Number, min: 1, max: 10, required: true },
  porosity: { type: String, enum: ['extra porous', 'porous', 'normal'], required: true },
  type: { type: String, enum: ['exothermic', 'acid', 'alkaline'], required: true },
}, { _id: false });

const dyeDetailsSchema = new mongoose.Schema({
  scalpCondition: { type: Number, min: 1, max: 10, required: true },
  porosity: { type: String, enum: ['extra porous', 'porous', 'normal'], required: true },
  colorTreatment: {
    type: String,
    enum: ['semi permanent', 'toned', 'highlights', 'lowlights', 'bleached', 'henna', 'base', 'other'],
    required: true
  },
}, { _id: false });

const waxDetailsSchema = new mongoose.Schema({
  location: {type: String, enum: ['eyebrows and lip', 'eyebrows', 'lip', 'chin', 'body', 'face', 'bikini'], required: true},
  skinType: {type: String, enum: ['normal', 'sensitive']},
  
}, {_id: false});
const hairServiceDetailsSchema = new mongoose.Schema({
  service: {type: String, emum: ['haircut', 'style', 'haircut and style', 'shampoo and haircut']}
}, {_id: false});

// --- Service Schema ---
const serviceSchema = new mongoose.Schema({
  type: { type: String, enum: ['wax', 'perm', 'color', 'hair service'], required: true },
  date: { type: Date, required: true },
  comments: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  permDetails: {
    type: permDetailsSchema,
    required: function () { return this.type === 'perm'; },
  },
  dyeDetails: {
    type: dyeDetailsSchema,
    required: function () { return this.type === 'color'; },
  },
  waxDetails: {
    type: waxDetailsSchema,
    required: function () { return this.type === 'wax'; },
  },
    hairServiceDetails: {
    type: hairServiceDetailsSchema,
    required: function () { return this.type === 'hair service'; },
  },
}, { timestamps: true });

// --- Client Schema ---
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: false,
    match: /.+\@.+\..+/
  },
  cell: {
    type: String,
    required: true,
    match: /^[0-9\-+\s()]{7,15}$/
  },
  allergies: { type: String },
  birthday: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual to get all services for a client
clientSchema.virtual('services', {
  ref: 'Service',
  localField: '_id',
  foreignField: 'client'
});

// --- Models ---
const Client = mongoose.model('Client', clientSchema);
const Service = mongoose.model('Service', serviceSchema);

// Optional exports
module.exports = {
  Client,
  Service,
};
