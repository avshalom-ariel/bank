const express = require('express');
const authToken = require('../middleware/authMiddleware');  // Your path here

const router = express.Router();

const transactionControllers = require('../controllers/transactionController');

router.post('/', authToken, transactionControllers.createTransaction);
router.get('/', authToken, transactionControllers.getTransactions);

module.exports = router;
