const Customer = require('../models/Customer');
const CustomerInvoice = require('../models/CustomerInvoice');
const CustomerPayment = require('../models/CustomerPayment');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get customer by id with invoices
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const invoices = await CustomerInvoice.find({ customer: customer._id });
    res.json({ customer, invoices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add invoice for customer
exports.addInvoice = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { invoiceDate, amount, notes } = req.body;
    const invoice = new CustomerInvoice({ customer: customerId, invoiceDate, amount, paid: 0, due: amount, notes });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add payment against an invoice
exports.addPayment = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { paymentDate, amount } = req.body;
    const invoice = await CustomerInvoice.findById(invoiceId);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const payment = new CustomerPayment({ invoice: invoiceId, paymentDate, amount });
    await payment.save();

    // Update invoice totals
    invoice.paid = (invoice.paid || 0) + amount;
    invoice.due = Math.max(0, invoice.amount - invoice.paid);
    await invoice.save();

    res.status(201).json({ payment, invoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get invoices for a customer
exports.getInvoicesForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const invoices = await CustomerInvoice.find({ customer: customerId }).sort({ invoiceDate: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payments for a specific invoice
exports.getPaymentsForInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const payments = await CustomerPayment.find({ invoice: invoiceId }).sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
