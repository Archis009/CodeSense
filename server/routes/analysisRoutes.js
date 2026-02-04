import express from 'express';
const router = express.Router();
import {
  analyzeCode,
  getHistory,
  getAnalysisById,
  deleteAnalysis,
} from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, analyzeCode);
router.get('/', protect, getHistory);
router.get('/:id', protect, getAnalysisById);
router.delete('/:id', protect, deleteAnalysis);

export default router;
