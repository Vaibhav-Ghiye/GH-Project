const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerPaymentSchema = new Schema({
  invoice: { type: Schema.Types.ObjectId, ref: 'CustomerInvoice', required: true },
  paymentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomerPayment', CustomerPaymentSchema);
