const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customerController');

// Customer CRUD
router.post('/', customerCtrl.createCustomer);
router.get('/', customerCtrl.getCustomers);
router.get('/:id', customerCtrl.getCustomerById);

// Invoices
router.post('/:customerId/invoices', customerCtrl.addInvoice);
router.get('/:customerId/invoices', customerCtrl.getInvoicesForCustomer);

// Payments against invoice
router.post('/invoices/:invoiceId/payments', customerCtrl.addPayment);
router.get('/invoices/:invoiceId/payments', customerCtrl.getPaymentsForInvoice);

module.exports = router;
