const express = require('express');
const router = express.Router();
const merchantCtrl = require('../controllers/merchantController');

// Merchant CRUD
router.post('/', merchantCtrl.createMerchant);
router.get('/', merchantCtrl.getMerchants);
router.get('/:id', merchantCtrl.getMerchantById);

// Bills
router.post('/:merchantId/bills', merchantCtrl.addBill);
router.get('/:merchantId/bills', merchantCtrl.getBillsForMerchant);

// Payments against bill
router.post('/bills/:billId/payments', merchantCtrl.addPayment);
router.get('/bills/:billId/payments', merchantCtrl.getPaymentsForBill);

module.exports = router;
