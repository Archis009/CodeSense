import express from 'express';
const router = express.Router();
import {
  analyzeCode,
  getHistory,
  getAnalysisById,
  deleteAnalysis,
  analyzeRepo,
} from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, analyzeCode);
router.post('/repo', protect, analyzeRepo);
router.get('/', protect, getHistory);
router.get('/:id', protect, getAnalysisById);
router.delete('/:id', protect, deleteAnalysis);

export default router;
