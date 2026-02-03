import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const analyzeCodeWithAI = async (code, language) => {
  try {
    const prompt = `
      You are an expert senior software engineer and code reviewer.
      Analyze the following ${language} code.

      Respond in strictly valid JSON format with this structure:
      {
        "score": <number 0-100>,
        "verdict": "<string: Perfect|Excellent|Good|Fair|Poor|Critical>",
        "verdictExplanation": "<string: one line summary>",
        "strengths": ["<string>", "<string>", ...],
        "issues": [
          {
            "title": "<string: what is wrong>",
            "description": "<string: why it matters>",
            "fix": "<string: how to fix it>",
            "severity": "<string: High|Medium|Low>"
          }
        ],
        "actionableImprovements": ["<string: checklist item>", ...],
        "refactoredCode": "<string: full improved code>"
      }

      Focus on:
      1. Correctness and Logic
      2. Time and Space Complexity
      3. Code Style and Best Practices
      4. Security Vulnerabilities

      Code to analyze:
      ${code}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown code blocks if Gemini adds them
    let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const analysis = JSON.parse(jsonStr);
    
    // Ensure consistent structure
    return {
       score: analysis.score || 0,
       verdict: analysis.verdict || "Unknown",
       verdictExplanation: analysis.verdictExplanation || "No explanation provided.",
       strengths: analysis.strengths || [],
       issues: analysis.issues || [],
       actionableImprovements: analysis.actionableImprovements || [],
       refactoredCode: analysis.refactoredCode || "",
    };

  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw error;
  }
};

export default { analyze: analyzeCodeWithAI };
