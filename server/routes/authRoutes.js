import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
  updatePassword,
  githubLogin,
  githubCallback,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/github', githubLogin);
router.get('/github/callback', githubCallback);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);
router.put('/password', protect, updatePassword);

export default router;
