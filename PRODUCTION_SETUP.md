# Production Setup Guide

## Backend Configuration

### Environment Variables Required

Set these in your backend hosting platform (Railway, Render, Heroku, etc.):

```env
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://carrer-quest.vercel.app
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_strong_secret_key
MONGO_URI=your_mongodb_connection_string
RABBITMQ_URL=your_rabbitmq_url
```

### CORS Configuration

The backend is now configured to:
- Allow all Vercel preview deployments (`*.vercel.app`)
- Allow your production frontend URL
- Use environment variable `FRONTEND_URL` for the main frontend

## Frontend Configuration (Vercel)

### Environment Variables Required

Set these in your Vercel project settings:

1. Go to: https://vercel.com/theory903s-projects/carrer-quest/settings/environment-variables

2. Add:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   ```

   Replace `https://your-backend-url.com` with your actual backend URL (e.g., Railway, Render, etc.)

### Example Backend URLs:
- Railway: `https://your-app.railway.app`
- Render: `https://your-app.onrender.com`
- Heroku: `https://your-app.herokuapp.com`
- Custom domain: `https://api.careerquest.com`

## Quick Setup Steps

1. **Deploy Backend** to Railway/Render/Heroku
2. **Get Backend URL** from your hosting platform
3. **Set Environment Variable** in Vercel:
   - `NEXT_PUBLIC_BACKEND_URL` = your backend URL
4. **Redeploy** frontend on Vercel

## Testing

After setup, test:
- Frontend: https://carrer-quest.vercel.app
- Backend Health: `https://your-backend-url.com/api/health`
