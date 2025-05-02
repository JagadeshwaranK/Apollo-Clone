const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  specialty: { type: String, required: true, index: true },
  experience: { type: Number, required: true, index: true },
  location: { type: String, required: true, index: true },
  fees: { type: Number, required: true, index: true },
  rating: { type: Number, required: true, index: true },
  qualifications: { type: [String], default: [] },
  availability: { type: [String], default: [], index: true },
  consultationMode: { type: [String], default: [], index: true },
  languages: { type: [String], default: [], index: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
