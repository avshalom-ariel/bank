// models/Account.js
const mongoose = require('mongoose');

// Define the schema for an account
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 5000
    },
    messages: {
        type: Array,
        default: [],
    }
});

// Create and export the Account model
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
