const mongoose = require('mongoose');
const { Schema } = mongoose;

const MerchantPaymentSchema = new Schema({
  bill: { type: Schema.Types.ObjectId, ref: 'MerchantBill', required: true },
  paymentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MerchantPayment', MerchantPaymentSchema);
