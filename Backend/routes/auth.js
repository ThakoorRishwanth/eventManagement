const express = require('express');
const {
    registerUser,
    authUser,
    refreshToken,
    logout,
    getUserProfile,
    getAllUsers
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);      // Route for registering a user
router.post('/login', authUser);             // Route for user authentication (login)
router.post('/token', refreshToken);         // Route to refresh access token
router.post('/logout', logout);              // Route for logging out a user

// Profile route: protects access to user profile
router.get('/profile', protect, getUserProfile);

// Get all users route: protects access and lists all users (only for admin)
router.get('/users', protect, getAllUsers);  

module.exports = router;
