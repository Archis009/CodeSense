# 🚀 CodeSense - AI-Powered Code Quality & Security Analyzer

<div align="center">
  <img src="client/public/logo.png" alt="CodeSense Logo" width="100" height="auto" />
  <br/>
  <h3>Analyze code for bugs, security vulnerabilities, and performance issues instantly with AI.</h3>
  <br/>
</div>

CodeSense is a modern SaaS platform that leverages advanced AI to provide instant, comprehensive code reviews. It helps developers identify bugs, security flaws, and performance bottlenecks in seconds.

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses Gemini AI to scan code for complex logic errors and improvements.
- **🛡️ Security Scanning 2.0**: Enterprise-grade vulnerability detection (SQLi, XSS, etc.).
- **⚡ Instant Results**: Get feedback in seconds, not minutes.
- **📊 Interactive Dashboard**: Track code quality trends, history, and usage statistics.
- **🔐 Secure Authentication**: User accounts with secure login and profile management.
- **🎨 Modern UI**: Beautiful, dark-mode-first interface built with React, TailwindCSS, and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **AI Engine**: Google Gemini API
- **Authentication**: JWT & OAuth
- **Deployment**: Vercel

## 🚀 Getting Started

Follow these steps to set up CodeSense locally.

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas URI
- Gemini API Key

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/codesense.git
    cd codesense
    ```

2.  **Install Dependencies**
    We use `concurrently` to manage both client and server installation from the root.

    ```bash
    npm run install-all
    ```

    _Alternatively, install individually in `client/` and `server/` directories._

3.  **Environment Setup**

    **Server (`server/.env`)**

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    CLIENT_URL=http://localhost:5173
    ```

    **Client (`client/.env`)**

    ```env
    VITE_API_URL=http://localhost:5000
    ```

4.  **Run the Application**
    Start both frontend and backend concurrently:

    ```bash
    npm run dev
    ```

    - **Frontend**: `http://localhost:5173`
    - **Backend**: `http://localhost:5000`

## 📖 Usage Guide

1.  **Register/Login**: Create an account to save your analysis history.
2.  **New Analysis**: Navigate to "New Analysis" from the dashboard.
3.  **Analyze**: Paste your code snippet to receive an instant review.
4.  **Review Reports**: Check the "History" tab to see past analyses and improvements.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

- **Frontend**: Deploys from `client` directory.
- **Backend**: Deploys as serverless functions from `server` directory.

See existing `vercel.json` configurations in `client/` and `server/` for details.

## 📄 License

MIT License.
