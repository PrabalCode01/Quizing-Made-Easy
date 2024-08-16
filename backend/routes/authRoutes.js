const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

// Route for user registration
router.route('/register').post(registerUser);

// Route for user login
router.route('/login').post(loginUser);

module.exports = router;
