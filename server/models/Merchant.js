const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    address: { type: String }
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Merchant', MerchantSchema);
