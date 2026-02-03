import mongoose from 'mongoose';

const analysisSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      default: 'snippet.js',
    },
    score: {
      type: Number,
      required: true,
    },
    feedback: {
      verdict: String,
      verdictExplanation: String,
      strengths: [String],
      issues: [
        {
          title: String,
          description: String,
          fix: String,
          severity: String,
        },
      ],
      actionableImprovements: [String],
      refactoredCode: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('CodeAnalysis', analysisSchema);
