import CodeAnalysis from '../models/CodeAnalysis.js';
// import openai from '../utils/aiService.js'; // Future integration

// Mock Analysis Function (Deterministic)
const calculateMockAnalysis = (code, language) => {
  const lang = language.toLowerCase();
  let isGood = code.length > 50;
  let issues = [];
  let suggestions = [];

  // Language specific checks
  if (lang === 'python') {
    if (code.includes('print ')) issues.push('Use print() function in Python 3');
    if (code.includes('camelCase')) suggestions.push('Use snake_case for variable names in Python');
  } else if (lang === 'javascript' || lang === 'typescript') {
    if (code.includes('var ')) issues.push('Use of "var" is discouraged');
    if (code.includes('==')) suggestions.push('Use "===" for strict equality');
  } else if (lang === 'java') {
    if (code.includes('System.out.println')) isGood = true; // Just a dummy check
  }

  // General checks
  if (code.length < 20) issues.push('Code snippet is too short for meaningful analysis');
  if (!issues.length && isGood) isGood = true;

  const score = isGood ? 85 : 45;
  
  return {
    qualityScore: score,
    readability: isGood ? 'Good' : 'Needs Improvement',
    complexity: isGood ? 'Low' : 'Moderate',
    issues: issues.length ? issues : ['No critical issues found'],
    securityConcerns: ['No input validation detected in snippet'],
    suggestions: suggestions.length ? suggestions : ['Consider adding comments', 'Review variable naming conventions'],
    improvedCodeSnippet: code, // In a real app, this would be the refactored code
  };
};

// @desc    Analyze code
// @route   POST /api/analysis
// @access  Private
const analyzeCode = async (req, res) => {
  const { code, language, filename } = req.body;

  if (!code) {
    res.status(400);
    throw new Error('Please provide code to analyze');
  }

  // TODO: Call Real AI Service here
  // const aiResult = await openai.analyze(code, language);
  const aiResult = calculateMockAnalysis(code, language);

  const analysis = await CodeAnalysis.create({
    userId: req.user.id,
    language: language || 'javascript',
    code,
    filename: filename || 'snippet.js',
    score: aiResult.qualityScore,
    feedback: aiResult,
  });

  res.status(201).json(analysis);
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
