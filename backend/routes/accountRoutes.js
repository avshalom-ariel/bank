const express = require('express');
const router = express.Router();
const { getMessages } = require('../controllers/messagesController');
const authToken = require("../middleware/authMiddleware");
const {
    registerUser,
    loginUser,
} = require('../controllers/accountController');

router.post('/register', registerUser);
router.post(`/login`, loginUser);
router.get(`/messages`, authToken, getMessages);

module.exports = router;
