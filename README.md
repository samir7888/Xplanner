# 📄 AI PDF & YouTube Chat Assistant 🎥

[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/CSS-Tailwindv4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Pinecone](https://img.shields.io/badge/Vector_DB-Pinecone-272e3d?style=for-the-badge&logo=pinecone&logoColor=white)](https://www.pinecone.io/)

A state-of-the-art AI application that enables interactive conversations with your **PDF documents** and **YouTube videos**. Leveraging the power of **Google Gemini API** for reasoning and **Pinecone** for high-performance vector retrieval, this tool provides context-aware answers to even the most complex queries.

---

## ✨ Key Features

- 📂 **Multi-Source Knowledge**: Upload PDF files or simply provide a YouTube Link.
- 💬 **Context-Aware Chat**: Ask questions and get precise answers based on the uploaded content.
- ⚡ **RAG Architecture**: Implements Retrieval-Augmented Generation for accurate, evidence-based AI responses.
- 🔍 **YouTube Transcription**: Automatically extracts transcripts from YouTube videos for analysis.
- 🎨 **Modern Interface**: A sleek, responsive design built with Tailwind CSS v4 and Radix UI primitives.
- 🚀 **High Performance**: Built with NestJS (Backend) and Vite + React (Frontend) for a lightning-fast experience.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS v4 (Experimental features)
- **UI Components**: Radix UI, Lucide Icons
- **HTTP Client**: Axios
- **State/Notifications**: Sonner

### Backend
- **Framework**: NestJS
- **Orchestration**: LangChain
- **LLM**: Google Generative AI (Gemini Flash/Pro)
- **Vector Database**: Pinecone
- **Processing**: pdf-parse, youtube-transcript-plus

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) or `npm`
- Google AI Studio API Key (for Gemini)
- Pinecone API Key & Index

### Installation & Setup

#### 1. Clone the repository
```bash
git clone <repository-url>
cd pdf-reader
```

#### 2. Backend Configuration
Navigate to the backend directory and set up environment variables:
```bash
cd backend/backend
# Create a .env file
touch .env
```
Add the following to your `.env`:
```env
GEMINI_API_KEY=your_google_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PORT=8000
```

#### 3. Install Backend Dependencies
```bash
pnpm install
# or
npm install
```

#### 4. Frontend Configuration
Navigate to the frontend directory:
```bash
cd ../frontend
```
*Note: The frontend is configured to connect to `http://localhost:8000` by default in `services/api.ts`.*

#### 5. Install Frontend Dependencies
```bash
pnpm install
# or
npm install
```

---

## 🏃 Running the Application

### Start the Backend
Open a terminal in `backend/backend`:
```bash
pnpm dev
```
The server will start at `http://localhost:8000`.

### Start the Frontend
Open a new terminal in `backend/frontend`:
```bash
pnpm dev
```
The application will be available at `http://localhost:5173` (or the port shown in your terminal).

---

## 📂 Project Structure

```bash
pdf-reader/
├── backend/
│   ├── backend/        # NestJS Backend source code
│   │   ├── src/        # Feature modules: pdf, youtube, gemini, etc.
│   │   └── uploads/    # Temporary PDF storage
│   └── frontend/       # React + Vite Frontend source code
│       ├── src/        # UI components and logic
│       └── services/   # API abstraction layer
└── Readme.md           # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [UNLICENSED](license) - see the project details for more info.

---

