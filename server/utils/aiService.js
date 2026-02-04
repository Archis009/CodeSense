import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";


dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

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


    const makeRequest = async (retries = 3, delay = 2000) => {
      try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash' ,
                  contents: prompt
                });
        console.log(response);
        return response.text;
      } catch (error) {
        if (retries > 0 && (error.message.includes('429') || error.message.includes('Quota exceeded'))) {
          console.warn(`Quota exceeded. Retrying in ${delay / 1000}s... (${retries} retries left)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return makeRequest(retries - 1, delay * 2);
        }
        throw error;
      }
    };

    const text = await makeRequest();
    
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
