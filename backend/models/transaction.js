// models/Transaction.js
const mongoose = require('mongoose');

// Define the schema for a transaction
const transactionSchema = new mongoose.Schema({
    senderEmail: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Account',  // Reference to the Account model
        type: String,
        required: true
    },
    receiverEmail: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Account',  // Reference to the Account model
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Transaction model
const Transactions = mongoose.model('Transactions', transactionSchema);
module.exports = Transactions;
