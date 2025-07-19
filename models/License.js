const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },  // 'unique' might be causing issue
  issuedTo: { type: String },
  expiryDate: { type: Date },
  packageType: { type: String },
  deviceId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('License', licenseSchema);
