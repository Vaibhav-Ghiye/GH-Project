const mongoose = require('mongoose');
const { Schema } = mongoose;

const MerchantBillSchema = new Schema({
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true },
  billDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  paid: { type: Number, default: 0 },
  due: { type: Number, default: 0 },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MerchantBill', MerchantBillSchema);
