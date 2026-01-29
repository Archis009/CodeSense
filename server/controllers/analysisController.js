import CodeAnalysis from '../models/CodeAnalysis.js';
// import openai from '../utils/aiService.js'; // Future integration

// Mock Analysis Function (Deterministic)
const calculateMockAnalysis = (code, language) => {
  const isGood = code.length > 50 && !code.includes('var ');
  const score = isGood ? 85 : 45;
  
  return {
    qualityScore: score,
    readability: isGood ? 'Good' : 'Needs Improvement',
    complexity: isGood ? 'Low' : 'Moderate',
    issues: isGood 
      ? ['Minor formatting inconsistencies'] 
      : ['Use of "var" is discouraged', 'Function lacks comments', 'Potential global variable leakage'],
    securityConcerns: ['No input validation detected in snippet'],
    suggestions: isGood 
      ? ['Consider adding JSDoc comments'] 
      : ['Replace "var" with "let" or "const"', 'Refactor into smaller functions'],
    improvedCodeSnippet: isGood 
      ? code 
      : `// Improved Code\nconst fixedVariable = "secure";\n\n${code.replace(/var /g, 'const ')}`,
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
  const history = await CodeAnalysis.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(history);
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
