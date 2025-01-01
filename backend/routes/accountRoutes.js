// routes/accountRoutes.js
const express = require('express');
const router = express.Router();

// Import the account controller
const {
    registerUser,
    loginUser,
} = require('../controllers/accountController');
// const authToken = require("../middleware/authMiddleware");

// Define the routes and map them to controller functions
router.post('/register', registerUser);
router.post(`/login`, loginUser);
// router.get('/:id', logoutUser);
// router.post('/:id', resetPassword);
// router.put('/:id', changePassword);


module.exports = router;
