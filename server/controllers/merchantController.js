const Merchant = require('../models/Merchant');
const MerchantBill = require('../models/MerchantBill');
const MerchantPayment = require('../models/MerchantPayment');

// Create a new merchant
exports.createMerchant = async (req, res) => {
  try {
    const merchant = new Merchant(req.body);
    await merchant.save();
    res.status(201).json(merchant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all merchants
exports.getMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find().sort({ createdAt: -1 });
    res.json(merchants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get merchant by id with bills and payments summary
exports.getMerchantById = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ error: 'Merchant not found' });

    const bills = await MerchantBill.find({ merchant: merchant._id });
    // Optionally populate payments per bill
    res.json({ merchant, bills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add bill for merchant
exports.addBill = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const { billDate, amount, notes } = req.body;
    const bill = new MerchantBill({ merchant: merchantId, billDate, amount, paid: 0, due: amount, notes });
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add payment against a bill
exports.addPayment = async (req, res) => {
  try {
    const { billId } = req.params;
    const { paymentDate, amount } = req.body;
    const bill = await MerchantBill.findById(billId);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });

    const payment = new MerchantPayment({ bill: billId, paymentDate, amount });
    await payment.save();

    // Update bill totals
    bill.paid = (bill.paid || 0) + amount;
    bill.due = Math.max(0, bill.amount - bill.paid);
    await bill.save();

    res.status(201).json({ payment, bill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bills for a merchant
exports.getBillsForMerchant = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const bills = await MerchantBill.find({ merchant: merchantId }).sort({ billDate: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payments for a specific bill
exports.getPaymentsForBill = async (req, res) => {
  try {
    const { billId } = req.params;
    const payments = await MerchantPayment.find({ bill: billId }).sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
