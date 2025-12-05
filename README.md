# PathGen AI - Personalized Learning Roadmap Generator

<div align="center">

![PathGen AI](https://img.shields.io/badge/PathGen-AI%20Powered-4876EE?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=for-the-badge&logo=python)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

**An intelligent learning platform that generates personalized coding roadmaps and AI-powered quizzes to accelerate your learning journey.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 🚀 Features

### 🗺️ **AI-Powered Roadmap Generation**
- Generate personalized, day-wise learning roadmaps for any programming language or technology
- Adaptive content based on skill level (Beginner, Intermediate, Advanced)
- Structured learning paths with topics and concepts breakdown
- Visual roadmap representation using interactive flow diagrams
- Roadmap caching to optimize performance

### 📝 **Intelligent Quiz System**
- AI-generated MCQ quizzes tailored to your chosen topic and difficulty level
- 30 interview-oriented questions per quiz session
- Timed questions (40 seconds each) for exam-like experience
- Support for both predefined topics (Java, Python, C, C++, DSA, Algorithms, OS, DBMS, OOPs) and custom topics
- Real-time answer evaluation

### 🤖 **AI-Powered Feedback**
- Detailed performance analysis using Google Gemini AI
- Personalized strengths and weaknesses assessment
- Actionable improvement suggestions
- Question-by-question breakdown of correct/incorrect answers

### 👥 **User Management**
- Dual authentication system:
  - Google OAuth 2.0 for seamless sign-in
  - Traditional email/password authentication with bcrypt encryption
- Secure session management with MongoDB session store
- Protected routes for authenticated users only

### 🎨 **Modern UI/UX**
- Responsive design optimized for desktop (1024px+)
- Dark/Light mode support with Material-UI theming
- Interactive roadmap visualization using ReactFlow
- Clean, intuitive interface with smooth animations

---

## 📸 Demo

> Add screenshots or GIFs of your application here

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.1** - Modern UI library
- **Material-UI (MUI)** - Component library with custom theming
- **ReactFlow** - Interactive node-based UI for roadmap visualization
- **Axios** - HTTP client for API requests
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### **Backend**
- **Node.js + Express 5** - RESTful API server
- **Passport.js** - Authentication middleware
  - Google OAuth 2.0 Strategy
  - Local Strategy (email/password)
- **Express Session** - Session management
- **MongoDB + Mongoose** - NoSQL database and ODM
- **Bcrypt** - Password hashing

### **AI/ML Services**
- **Python FastAPI** - High-performance API for AI operations
- **Google Gemini AI** - Text generation and embeddings
- **ChromaDB** - Vector database for semantic search
- **Pandas** - Data processing for learning datasets

### **Infrastructure**
- **MongoDB Atlas** - Cloud database hosting
- **Connect-Mongo** - MongoDB session store
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Python** (v3.10.14)
- **MongoDB** (or MongoDB Atlas account)
- **Google OAuth Credentials** (Client ID & Secret)
- **Google Gemini API Key**

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Shiva-0515/PathGen-AI.git
cd PathGen-AI
```

### 2️⃣ Backend Setup

#### Install Node.js Dependencies
```bash
cd Backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production  # or 'development'
SERVER_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Session Secret
SESSION_SECRET=your_super_secret_session_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# FastAPI Service
FASTAPI_URL=http://127.0.0.1:8000
```

#### Setup Python Environment
```bash
cd Backend/rag_app
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Configure Python Environment
Create a `.env` file in `Backend/rag_app`:
```env
GENAI_API_KEY=your_google_gemini_api_key
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### Configure Frontend Environment
Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Running the Application

### Start Backend Services

#### Terminal 1: Express Server
```bash
cd Backend
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

#### Terminal 2: FastAPI Server
```bash
cd Backend/rag_app
source venv/bin/activate  # Activate virtual environment
uvicorn server:app --reload --port 8000
```

#### Terminal 3: Initialize ChromaDB (First Time Only)
```bash
cd Backend/rag_app
python run_roadmap.py
# This will populate the vector database with learning paths
```

### Start Frontend

#### Terminal 4: React Development Server
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **FastAPI**: http://localhost:8000

---

## 📁 Project Structure

```
PathGen-AI/
├── Backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── passport.js        # Passport authentication config
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Roadmaps.js        # Roadmap schema
│   ├── Routes/
│   │   ├── auth.js            # Google OAuth routes
│   │   ├── authManual.js      # Email/password auth routes
│   │   ├── roadmap.js         # Roadmap generation routes
│   │   ├── quiz.js            # Quiz routes
│   │   └── community.js       # Community features
│   ├── rag_app/
│   │   ├── server.py          # FastAPI application
│   │   ├── rag_core.py        # AI/RAG logic
│   │   ├── models.py          # Pydantic models
│   │   ├── chroma_db/         # Vector database
│   │   └── Data/              # Learning datasets (CSV)
│   └── server.js              # Express app entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppAppBar.js       # Navigation bar
│   │   │   ├── Hero.js            # Landing page hero
│   │   │   ├── RoadmapFlow.js     # Roadmap visualization
│   │   │   ├── QuizSelector.js    # Quiz topic selection
│   │   │   ├── QuizApp.js         # Quiz interface
│   │   │   ├── Signin.js          # Sign in page
│   │   │   ├── Signup.js          # Sign up page
│   │   │   ├── Pricing.js         # Pricing page
│   │   │   └── FAQ.js             # FAQ page
│   │   ├── customizations/        # MUI theme customizations
│   │   ├── AppTheme.js            # Theme provider
│   │   ├── ProtectedRoute.js      # Auth wrapper
│   │   ├── App.js                 # Main app component
│   │   └── index.js               # React entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication Flow

### Google OAuth
1. User clicks "Sign in with Google"
2. Redirects to `/auth/google`
3. Google authentication and consent
4. Callback to `/auth/google/callback`
5. User profile stored/retrieved from MongoDB
6. Session created and user redirected to dashboard

### Email/Password
1. User registers via `/auth/signup` with full name, email, and password
2. Password hashed with bcrypt (10 rounds)
3. User automatically logged in after successful registration
4. Login via `/auth/signin` validates credentials
5. Session established on successful authentication

---

## 🧠 AI Roadmap Generation Flow

1. **User Input**: Course name, skill level, and duration
2. **Query Construction**: Formatted query sent to ChromaDB
3. **Semantic Search**: ChromaDB retrieves top 5 relevant learning modules
4. **Prompt Engineering**: Context + user requirements formatted for Gemini AI
5. **AI Generation**: Google Gemini generates structured day-wise roadmap
6. **Parsing**: Response parsed into JSON with days, steps, and concepts
7. **Caching**: Roadmap stored in MongoDB for future requests
8. **Visualization**: Frontend renders interactive flow diagram

### Roadmap Data Structure
```javascript
{
  "day": 1,
  "step": "Understand Basic Programming Concepts",
  "concepts": [
    {
      "name": "Variables and Data Types",
      "description": "Learn how to declare and use variables..."
    },
    {
      "name": "Control Structures",
      "description": "Master if statements, loops, and conditionals..."
    }
  ]
}
```

---

## 📊 Quiz System Architecture

### Quiz Generation
1. User selects topic and difficulty level
2. Request sent to `/generate-quiz` endpoint
3. FastAPI forwards to Gemini AI with structured prompt
4. AI generates 30 MCQ questions with 4 options each
5. Questions returned as JSON array
6. Frontend displays questions one-by-one with 40s timer

### Evaluation & Feedback
1. User submissions sent to `/evaluate-quiz`
2. Backend calculates score and categorizes answers
3. Evaluation data sent to Gemini AI for analysis
4. AI generates:
   - **Pros**: Student's strengths
   - **Cons**: Areas needing improvement
   - **Suggestions**: Actionable next steps
5. Complete feedback displayed to user

---

## 🔒 Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **Session Security**: 
  - HttpOnly cookies
  - Secure flag in production
  - SameSite protection
  - 24-hour session expiry
- **CORS Configuration**: Whitelisted origins only
- **Environment Variables**: Sensitive data stored in `.env` files
- **Input Validation**: Server-side validation for all user inputs
- **Protected Routes**: Authentication middleware on sensitive endpoints

---

## 🌐 API Endpoints

### Authentication
```
POST   /auth/signup           # Register new user
POST   /auth/signin           # Login with email/password
GET    /auth/google           # Initiate Google OAuth
GET    /auth/google/callback  # Google OAuth callback
GET    /auth/status           # Check authentication status
GET    /logout                # Logout user
```

### Roadmap
```
POST   /generate-roadmap      # Generate new roadmap
POST   /roadmaps/:id/share    # Make roadmap public
POST   /roadmaps/:id/unshare  # Make roadmap private
GET    /community             # Get public roadmaps
```

### Quiz
```
GET    /generate-quiz         # Generate quiz questions
POST   /evaluate-quiz         # Evaluate quiz answers
```

### FastAPI (Python)
```
GET    /                      # Health check
GET    /init-db               # Initialize ChromaDB
POST   /generate-roadmap      # AI roadmap generation
POST   /generate-quiz         # AI quiz generation
POST   /evaluate-quiz         # AI evaluation & feedback
```

---

## 🎨 Customization

### Theming
Modify `frontend/src/themePrimitives.js` to customize colors:
```javascript
export const brand = {
  50: 'hsl(210, 100%, 95%)',
  400: 'hsl(210, 98%, 48%)',  // Primary color
  // ... more shades
};
```

### Learning Data
Add custom learning paths in `Backend/rag_app/Data/`:
- CSV format with columns: Course, Topics, Level
- ChromaDB will automatically index new data

---

## 🐛 Troubleshooting

### Issue: "Backend is offline or authentication failed"
**Solution**: Ensure both Express and FastAPI servers are running

### Issue: ChromaDB collection not found
**Solution**: Run initialization script:
```bash
cd Backend/rag_app
python run_roadmap.py
```

### Issue: Google OAuth redirect error
**Solution**: 
1. Check Google Cloud Console authorized redirect URIs
2. Verify `SERVER_URL` in `.env` matches your domain
3. Add `http://localhost:5000/auth/google/callback` to authorized URIs

### Issue: CORS errors
**Solution**: Verify `CLIENT_URL` in backend `.env` matches frontend URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Shiva Kanchanapelli**

- GitHub: [@Shiva-0515](https://github.com/Shiva-0515)
- LinkedIn: [Shiva Kanchanapelli](https://www.linkedin.com/in/shiva-kanchanapelli-30b944350/)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful language models
- [Material-UI](https://mui.com/) for beautiful React components
- [ReactFlow](https://reactflow.dev/) for interactive diagrams
- [ChromaDB](https://www.trychroma.com/) for vector database
- [Passport.js](http://www.passportjs.org/) for authentication

---

## 📈 Roadmap

- [ ] Mobile responsive design
- [ ] Progress tracking dashboard
- [ ] Community roadmap sharing
- [ ] Social features (likes, comments)
- [ ] Quiz history and analytics
- [ ] Premium subscription features
- [ ] Additional authentication providers
- [ ] Downloadable roadmap PDFs
- [ ] Code playground integration
- [ ] Collaborative learning features

---

<div align="center">

**Made with ❤️ and ☕ by Shiva Kanchanapelli**

⭐ Star this repo if you find it helpful!

</div>
