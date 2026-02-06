import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import User from '../models/User.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('[Auth] Register request:', { name, email });

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return res.json({ message: 'User already exists' });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('[Auth] Login request:', { email });

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      description: user.description,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.json({ message: 'Invalid credentials' });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.description = req.body.description !== undefined ? req.body.description : user.description;
    user.profileImage = req.body.profileImage !== undefined ? req.body.profileImage : user.profileImage;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      description: updatedUser.description,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(400);
    throw new Error('Invalid current password');
  }
};

// @desc    Redirect to GitHub OAuth
// @route   GET /api/auth/github
// @access  Public
const githubLogin = (req, res) => {
  try {
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CALLBACK_URL) {
      console.error('Missing GitHub OAuth credentials');
      return res.redirect(`${process.env.CLIENT_URL}/login?error=Server%20Error:%20Missing%20GitHub%20Credentials`);
    }
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&scope=user:email`;
    res.redirect(redirectUri);
  } catch (error) {
    console.error('GitHub Login Redirect Error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=Server%20Error:%20GitHub%20Login%20Failed`);
  }
};

// @desc    Handle GitHub OAuth Callback
// @route   GET /api/auth/github/callback
// @access  Public
const githubCallback = async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = data.access_token;

    // Get user profile
    const { data: profile } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Get user emails (in case email is private)
    const { data: emails } = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const primaryEmail = emails.find((email) => email.primary).email;

    // Check if user exists
    let user = await User.findOne({ email: primaryEmail });

    if (!user) {
      // Create new user
      user = await User.create({
        name: profile.name || profile.login,
        email: primaryEmail,
        password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8), // Generate random password
        profileImage: profile.avatar_url,
        description: profile.bio || '',
        githubAccessToken: accessToken,
      });
    } else {
      // Update token for existing user
      user.githubAccessToken = accessToken;
      await user.save();
    }

    const token = generateToken(user._id);

    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}&user=${encodeURIComponent(JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token
    }))}`);

  } catch (error) {
    console.error('GitHub Auth Error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=GitHub login failed`);
  }
};

export {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
  updatePassword,
  githubLogin,
  githubCallback,
};
