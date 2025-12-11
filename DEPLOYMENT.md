# Deployment Guide

## 🚀 Production Deployment Options

### Option 1: Docker Compose (Recommended)

**Prerequisites:**
- Docker & Docker Compose installed
- Environment variables configured

**Steps:**
```bash
# 1. Clone repository
git clone <repo-url>
cd CarrerQuest

# 2. Create .env file
cp Webapp/server/.env.example .env
# Edit .env with production values

# 3. Build and start
docker-compose up -d

# 4. Check logs
docker-compose logs -f
```

**Services:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- RabbitMQ Management: http://localhost:15672

### Option 2: Vercel (Frontend) + Railway/Render (Backend)

#### Frontend on Vercel

1. **Connect Repository**
   - Go to vercel.com
   - Import GitHub repository
   - Select `Webapp` as root directory

2. **Environment Variables**
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   ```

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**

#### Backend on Railway/Render

1. **Connect Repository**
   - Import from GitHub
   - Set root directory: `Webapp/server`

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=5001
   GROQ_API_KEY=your_key
   JWT_SECRET=your_secret
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

3. **Build & Start**
   - Build: `npm install`
   - Start: `npm start`

### Option 3: Manual Server Deployment

#### Frontend Build
```bash
cd Webapp
npm install
npm run build
npm start
```

#### Backend Build
```bash
cd Webapp/server
npm install --production
NODE_ENV=production npm start
```

## 🔒 Security Checklist

- [ ] Change all default secrets
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Set proper CORS origins
- [ ] Configure rate limiting
- [ ] Enable security headers
- [ ] Use environment variables (never commit secrets)
- [ ] Regular security updates

## 📊 Monitoring

### Health Checks
- Frontend: `https://your-domain.com/api/health`
- Backend: `https://api.your-domain.com/api/health`

### Logs
```bash
# Docker
docker-compose logs -f backend
docker-compose logs -f frontend

# PM2 (if using)
pm2 logs careerquest-backend
pm2 logs careerquest-frontend
```

## 🔄 CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd Webapp && npm install && npm run build
      - run: cd Webapp/server && npm install
```

## 🌍 Environment-Specific Configs

### Development
```env
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Staging
```env
NODE_ENV=staging
FRONTEND_URL=https://staging.careerquest.com
```

### Production
```env
NODE_ENV=production
FRONTEND_URL=https://careerquest.com
```

## 📦 Build Optimization

- Frontend uses Next.js standalone output
- Backend uses production dependencies only
- Images optimized with Next.js Image component
- Code splitting enabled
- Tree shaking for unused code

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (20+)
- Clear `.next` and `node_modules`
- Check TypeScript errors: `npm run type-check`

### Runtime Errors
- Check environment variables
- Verify API endpoints
- Check CORS configuration
- Review server logs

### Performance Issues
- Enable caching
- Use CDN for static assets
- Optimize database queries
- Monitor API response times

