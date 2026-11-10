const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
  postcode: { type: String, required: true, unique: true, uppercase: true, trim: true },
  rawCode: String,
  buildingLabel: String,
  address: { street: String, lga: String, state: String },
  nipostVerification: { verified: Boolean, type: String, rawResponse: Object },
  owner: { name: String, phone: String, cac: { type: String, default: "RC 8489988" }, isVerified: Boolean },
  listing: { title: String, description: String, price: Number, isDirectFromOwner: Boolean, inspectionFee: Number },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Property', propertySchema);