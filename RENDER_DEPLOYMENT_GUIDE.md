# Step-by-Step Guide: Deploy Backend to Render

## Prerequisites
- GitHub repository connected to Render
- Render account (free tier works)

## Step 1: Create New Web Service

1. Go to your Render dashboard: https://dashboard.render.com
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

## Step 2: Connect Repository

1. Under **"Source Code"**, click **"Connect account"** or select **"Theory903 / CarrerQuest"**
2. Make sure the repository is connected

## Step 3: Configure Service Settings

Fill out the form with these exact values:

### Basic Settings
- **Name**: `CarrerQuest` (or any name you prefer)
- **Project** (Optional): Leave empty or create a new project
- **Environment**: Select **"Production"**
- **Region**: **"Ohio (US East)"** (or your preferred region)

### Build Settings
- **Language**: Select **"Docker"**
- **Branch**: `main`
- **Root Directory**: `Webapp/server` ⚠️ **IMPORTANT: Set this!**
- **Dockerfile Path**: `Dockerfile` (or leave default - it will use `./Dockerfile` relative to root directory)

### Instance Type
- For testing: **"Free"** ($0/month) - spins down after inactivity
- For production: **"Starter"** ($7/month) - always on, better performance

**Recommendation**: Start with **Free** to test, upgrade later if needed.

## Step 4: Environment Variables

Click **"Add Environment Variable"** and add these one by one:

### Required Variables:

1. **NODE_ENV**
   - Value: `production`

2. **PORT**
   - Value: `5001`

3. **FRONTEND_URL**
   - Value: `https://carrer-quest.vercel.app`
   - (This allows your Vercel frontend to call the backend)

4. **GROQ_API_KEY**
   - Value: Your actual Groq API key
   - Get it from: https://console.groq.com/keys

5. **JWT_SECRET**
   - Value: Generate a strong random string (32+ characters)
   - Example: `openssl rand -hex 32` (run in terminal)

6. **JWT_EXPIRES_IN**
   - Value: `7d`

### Optional Variables (if using):

7. **MONGO_URI** (if using MongoDB)
   - Value: `mongodb+srv://abhijha903_db_user:Abhijha903%40@cluster0.exvx0s2.mongodb.net/careerquest`
   - ⚠️ **Note**: The `@` in the password is URL-encoded as `%40`

8. **RABBITMQ_URL** (if using RabbitMQ)
   - Value: Your RabbitMQ URL
   - Example: `amqp://user:pass@host:5672`

## Step 5: Deploy

1. Scroll down and click **"Create Web Service"**
2. Render will start building your Docker image
3. Wait for deployment to complete (5-10 minutes)

## Step 6: Get Your Backend URL

1. Once deployed, Render will show your service URL
2. It will look like: `https://carrerquest-xxxx.onrender.com`
3. **Copy this URL** - you'll need it for the next step

## Step 7: Update Vercel Frontend

1. Go to Vercel: https://vercel.com/theory903s-projects/carrer-quest/settings/environment-variables
2. Click **"Add New"**
3. Add environment variable:
   - **Key**: `NEXT_PUBLIC_BACKEND_URL`
   - **Value**: Your Render backend URL (from Step 6)
   - Example: `https://carrerquest-xxxx.onrender.com`
4. Click **"Save"**
5. Vercel will automatically redeploy with the new variable

## Step 8: Test Your Deployment

1. **Test Backend Health**:
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"OK",...}`

2. **Test Frontend**:
   - Visit: `https://carrer-quest.vercel.app`
   - Try logging in or using features that call the backend

## Troubleshooting

### Build Fails
- Check Dockerfile path is correct: `Webapp/server/Dockerfile`
- Check that all dependencies are in `package.json`

### CORS Errors
- Make sure `FRONTEND_URL` in Render matches your Vercel URL
- Check backend logs in Render dashboard

### Backend Not Responding
- Check environment variables are set correctly
- View logs in Render dashboard: Click service → "Logs" tab

## Quick Reference

**Render Service URL Format**: `https://carrerquest-xxxx.onrender.com`

**Environment Variables Checklist**:
- ✅ NODE_ENV=production
- ✅ PORT=5001
- ✅ FRONTEND_URL=https://carrer-quest.vercel.app
- ✅ GROQ_API_KEY=your_key
- ✅ JWT_SECRET=your_secret
- ✅ JWT_EXPIRES_IN=7d
- ✅ MONGO_URI=mongodb+srv://abhijha903_db_user:Abhijha903%40@cluster0.exvx0s2.mongodb.net/careerquest

**Vercel Environment Variable**:
- ✅ NEXT_PUBLIC_BACKEND_URL=https://your-backend.onrender.com
