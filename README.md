# CareerQuest 🚀

AI-powered career guidance platform helping students discover their ideal career paths with personalized recommendations, expert mentorship, and visual analytics.

## 🏗️ Architecture

- **Frontend**: Next.js 14 (React 18) with TypeScript
- **Backend**: Node.js/Express with RESTful API
- **AI**: Groq (Llama 4) for career guidance
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn
- (Optional) Docker & Docker Compose

### Development Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd CarrerQuest
```

2. **Backend Setup**
```bash
cd Webapp/server
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

3. **Frontend Setup**
```bash
cd Webapp
npm install
cp .env.example .env.local
# Edit .env.local with backend URL
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/api/health

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Create .env file in root directory
cp Webapp/server/.env.example .env

# Edit .env with your production values
# Then run:
docker-compose up -d
```

### Individual Containers

**Backend:**
```bash
cd Webapp/server
docker build -t careerquest-backend .
docker run -p 5001:5001 --env-file .env careerquest-backend
```

**Frontend:**
```bash
cd Webapp
docker build -t careerquest-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_BACKEND_URL=http://localhost:5001 careerquest-frontend
```

## 📦 Production Build

### Frontend
```bash
cd Webapp
npm run build
npm start
```

### Backend
```bash
cd Webapp/server
NODE_ENV=production npm start
```

## 🌐 Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_BACKEND_URL`
4. Deploy

### Railway/Render (Backend)

1. Connect GitHub repository
2. Set build command: `cd Webapp/server && npm install`
3. Set start command: `cd Webapp/server && npm start`
4. Add environment variables from `.env.example`
5. Deploy

## 🔐 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

### Backend (.env)
```env
PORT=5001
NODE_ENV=production
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_secret_key
FRONTEND_URL=https://yourdomain.com
```

## 📁 Project Structure

```
CarrerQuest/
├── Webapp/
│   ├── src/
│   │   ├── app/          # Next.js app router pages
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts (Auth, etc.)
│   │   └── lib/          # Utilities
│   ├── server/
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation, etc.
│   │   └── db/           # JSON database files
│   └── public/           # Static assets
├── ML/                   # Machine learning models
└── Docs/                 # Documentation
```

## 🧪 Testing

```bash
# Frontend
cd Webapp
npm run lint

# Backend
cd Webapp/server
npm test  # (when tests are added)
```

## 🔒 Security Features

- JWT authentication with refresh tokens
- Rate limiting on API endpoints
- CORS protection
- Helmet.js security headers
- Password hashing with bcrypt
- Input validation and sanitization
- Error boundary handling

## 📝 API Documentation

See `Docs/API.md` for detailed API documentation.

## 🤝 Contributing

See `CONTRIBUTING.md` for contribution guidelines.

## 📄 License

Apache-2.0 License

## 👥 Team

FeedMind Team - Smart India Hackathon 2024

---

Built with ❤️ for students navigating their career journey
