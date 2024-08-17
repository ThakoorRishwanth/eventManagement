const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate access token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Helper function to generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// User registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;  // Added role to destructuring

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send('Invalid request data');
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send('User already exists, try to login');
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });  // Include role
    await user.save();
    
    res.status(201).json({ message: 'Register successful', user });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal server error');
  }
};

// User authentication (login)
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send('Email and password required');
    }

    // Check if user exists and password matches
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = generateToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      
      // Save refresh token in user record
      user.refreshToken = refreshToken;
      await user.save();
      
      res.status(200).json({ accessToken, refreshToken });
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error authenticating user:', err);
    res.status(500).send('Internal server error');
  }
};

// Refresh access token using refresh token
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) return res.status(401).json({ message: 'No token provided' });

    // Verify and decode the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    // Check if user exists and token matches
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Generate new access token
    const accessToken = generateToken(user._id);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(400).json({ message: 'Token refresh failed', error });
  }
};

// User logout
const logout = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const user = await User.findOne({ refreshToken });

    // Invalidate the refresh token
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(400).json({ message: 'User logout failed', error });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,  // Include role
      createdAt: user.createdAt,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Get all users (Admin access only)
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');

  if (users) {
    res.json(users);
  } else {
    res.status(404).json({ message: 'No users found' });
  }
};

module.exports = {
  registerUser,
  authUser,
  refreshToken,
  logout,
  getUserProfile,
  getAllUsers,
};
