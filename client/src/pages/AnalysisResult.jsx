import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  ArrowLeft, 
  Code2, 
  CheckSquare,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-cpp';
import { analysisService } from '../services/api';

const AnalysisResult = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('improved'); // 'original' or 'improved'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await analysisService.getAnalysisById(id);
        setAnalysis(data);
      } catch (err) {
        setError(err.message || 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  useEffect(() => {
    if (!loading && analysis) {
      Prism.highlightAll();
    }
  }, [loading, analysis, activeTab]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-100 text-red-600 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Error Loading Analysis</h3>
        <p className="text-slate-600 dark:text-slate-400 mt-2">{error}</p>
        <Link to="/dashboard" className="text-primary hover:underline mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!analysis) return null;

  const { score, feedback } = analysis;
  const { 
    verdict, 
    verdictExplanation, 
    strengths, 
    issues, 
    actionableImprovements, 
    refactoredCode 
  } = feedback;

  const getScoreColor = (s) => {
    if (s >= 80) return 'text-green-500 border-green-500';
    if (s >= 50) return 'text-yellow-500 border-yellow-500';
    return 'text-red-500 border-red-500';
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/history" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analysis Result</h1>
          <p className="text-slate-500 text-sm">Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* 1. Score & Verdict */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="md:col-span-1 p-8 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
          <div className={`relative w-32 h-32 rounded-full border-8 flex items-center justify-center mb-4 ${getScoreColor(score)}`}>
            <span className="text-4xl font-bold">{score}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{verdict}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">{verdictExplanation}</p>
        </div>

        {/* 2. Strengths */}
        <div className="md:col-span-2 p-8 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Key Strengths
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {strengths?.map((strength, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-xl"
              >
                <div className="mt-0.5 min-w-[20px]">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">{strength}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Issues / Mistakes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Issues & Improvements
          </h3>
          <div className="space-y-4">
            {issues?.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{issue.title}</h4>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                      issue.severity === 'High' ? 'bg-red-100 text-red-700' :
                      issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {issue.severity} Severity
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white block mb-1">Why it matters:</strong>
                    {issue.description}
                  </div>
                  <div className="text-sm bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg text-blue-800 dark:text-blue-200">
                    <strong className="block mb-1 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> How to fix:
                    </strong>
                    {issue.fix}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Actionable Improvements Checklist */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-primary" />
            Action Plan
          </h3>
          <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-4">Follow these steps to improve your code quality.</p>
            <div className="space-y-3">
              {actionableImprovements?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 min-w-[20px]">
                    <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-sm bg-transparent hover:bg-slate-400 transition-colors" />
                    </div>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Improved Code */}
      <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            Refactored Code
          </h3>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('original')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'original' 
                  ? 'bg-white dark:bg-dark-card shadow text-slate-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Original
            </button>
            <button
              onClick={() => setActiveTab('improved')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'improved' 
                  ? 'bg-white dark:bg-dark-card shadow text-primary' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Improved Solution
            </button>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute right-4 top-4 z-10">
            <button
              onClick={() => handleCopy(activeTab === 'improved' ? refactoredCode : analysis.code)}
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2 text-xs"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <div className="max-h-[600px] overflow-auto custom-scrollbar bg-[#2d2d2d]">
            <pre className="!m-0 !p-6 !bg-transparent text-sm">
              <code className={`language-${analysis.language}`}>
                {activeTab === 'improved' ? refactoredCode : analysis.code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
