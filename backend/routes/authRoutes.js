const express = require('express');
const authToken = require('../middleware/authMiddleware');
const authController = require("../controllers/authController");
const router = express.Router();

router.get('/', authToken, authController.getAuth);

module.exports = router;