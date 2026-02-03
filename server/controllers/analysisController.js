import CodeAnalysis from '../models/CodeAnalysis.js';
import openai from '../utils/aiService.js';

// Mock removed

// @desc    Analyze code
// @route   POST /api/analysis
// @access  Private
const analyzeCode = async (req, res) => {
  const { code, language, filename } = req.body;

  if (!code) {
    res.status(400);
    throw new Error('Please provide code to analyze');
  }

  try {
    const aiResult = await openai.analyze(code, language);

    const analysis = await CodeAnalysis.create({
      userId: req.user.id,
      language: language || 'javascript',
      code,
      filename: filename || 'snippet.js',
      score: aiResult.score,
      feedback: aiResult,
    });

    res.status(201).json(analysis);
  } catch (error) {
    console.error('Controller Error:', error);
    
    // Handle Gemini 429 (Too Many Requests) or 503 (Overloaded)
    if (error.message.includes('429') || error.message.includes('Quota exceeded')) {
      return res.status(429).json({ message: 'AI Rate limit exceeded. Please try again later.' });
    }
    if (error.message.includes('503')) {
      return res.status(503).json({ message: 'AI Service overloaded. Please try again later.' });
    }

    res.status(500).json({ message: error.message || 'Failed to analyze code' });
  }
};

// @desc    Get user analysis history
// @route   GET /api/analysis
// @access  Private
const getHistory = async (req, res) => {
  try {
    const analyses = await CodeAnalysis.find({ userId: req.user.id }) // Changed from Analysis to CodeAnalysis, and user to userId
      .sort({ createdAt: -1 }); // Newest first
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get specific analysis
// @route   GET /api/analysis/:id
// @access  Private
const getAnalysisById = async (req, res) => {
  const analysis = await CodeAnalysis.findById(req.params.id);

  if (!analysis) {
    res.status(404);
    throw new Error('Analysis not found');
  }

  // Ensure user owns this analysis
  if (analysis.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  res.status(200).json(analysis);
};

export {
  analyzeCode,
  getHistory,
  getAnalysisById,
};
