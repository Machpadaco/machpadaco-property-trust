const mongoose = require('mongoose');
const verificationSchema = new mongoose.Schema({
  postcode: String,
  nipostResult: Object,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Verification', verificationSchema);