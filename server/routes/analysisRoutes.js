import express from 'express';
const router = express.Router();
import {
  analyzeCode,
  getHistory,
  getAnalysisById,
} from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, analyzeCode);
router.get('/', protect, getHistory);
router.get('/:id', protect, getAnalysisById);

export default router;
