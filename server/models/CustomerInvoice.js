const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerInvoiceSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  invoiceDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  paid: { type: Number, default: 0 },
  due: { type: Number, default: 0 },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomerInvoice', CustomerInvoiceSchema);
