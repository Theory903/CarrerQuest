import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// In-memory user storage (use database in production)
const users = new Map();
const sessions = new Map();
const refreshTokens = new Map();
const passwordResetTokens = new Map();

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'careerquest_jwt_secret_key_2024_secure_random_string';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const REFRESH_TOKEN_EXPIRES = 30 * 24 * 60 * 60 * 1000; // 30 days
const BCRYPT_ROUNDS = 12;

// Rate limiting for auth endpoints
const authAttempts = new Map();
const MAX_AUTH_ATTEMPTS = 5;
const AUTH_LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// Check rate limit
export const checkAuthRateLimit = (identifier) => {
  const attempts = authAttempts.get(identifier);
  if (!attempts) return { allowed: true, remaining: MAX_AUTH_ATTEMPTS };
  
  // Clean up old attempts
  const now = Date.now();
  const validAttempts = attempts.filter(time => now - time < AUTH_LOCKOUT_TIME);
  
  if (validAttempts.length >= MAX_AUTH_ATTEMPTS) {
    const oldestAttempt = Math.min(...validAttempts);
    const unlockTime = new Date(oldestAttempt + AUTH_LOCKOUT_TIME);
    return { 
      allowed: false, 
      remaining: 0,
      unlockTime,
      message: `Too many attempts. Try again at ${unlockTime.toLocaleTimeString()}`
    };
  }
  
  return { allowed: true, remaining: MAX_AUTH_ATTEMPTS - validAttempts.length };
};

// Record auth attempt
export const recordAuthAttempt = (identifier) => {
  const attempts = authAttempts.get(identifier) || [];
  attempts.push(Date.now());
  authAttempts.set(identifier, attempts);
};

// Clear auth attempts on successful login
export const clearAuthAttempts = (identifier) => {
  authAttempts.delete(identifier);
};

// Generate JWT token
export const generateToken = (userId, email, type = 'access') => {
  const payload = { 
    userId, 
    email, 
    type,
    iat: Date.now() 
  };
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: type === 'refresh' ? '30d' : JWT_EXPIRES_IN 
  });
};

// Generate refresh token
export const generateRefreshToken = (userId) => {
  const token = uuidv4();
  const expiry = Date.now() + REFRESH_TOKEN_EXPIRES;
  
  refreshTokens.set(token, {
    userId,
    expiry,
    createdAt: Date.now()
  });
  
  return token;
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  const data = refreshTokens.get(token);
  if (!data) return null;
  
  if (Date.now() > data.expiry) {
    refreshTokens.delete(token);
    return null;
  }
  
  return data;
};

// Revoke refresh token
export const revokeRefreshToken = (token) => {
  refreshTokens.delete(token);
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { expired: true };
    }
    return null;
  }
};

// Auth middleware
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Authorization token required',
        code: 'NO_TOKEN'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ 
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }

    if (decoded.expired) {
      return res.status(401).json({ 
        error: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Authentication failed',
      code: 'AUTH_FAILED'
    });
  }
};

// Optional auth middleware (doesn't fail if no token)
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      if (decoded && !decoded.expired) {
        req.user = decoded;
      }
    }
    next();
  } catch (error) {
    next();
  }
};

// Hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, BCRYPT_ROUNDS);
};

// Compare password
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// User management functions
export const createUser = async (userData) => {
  const userId = uuidv4();
  const hashedPassword = await hashPassword(userData.password);
  
  const user = {
    id: userId,
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    role: userData.role || 'student',
    profile: {
      skills: [],
      interests: [],
      education: null,
      quizCompleted: false,
      quizResults: null,
      ...userData.profile
    },
    isVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  users.set(userId, user);
  users.set(user.email, user); // Index by email
  
  return user;
};

export const findUserByEmail = (email) => {
  return users.get(email.toLowerCase());
};

export const findUserById = (id) => {
  return users.get(id);
};

export const updateUser = (userId, updates) => {
  const user = users.get(userId);
  if (user) {
    const updated = { 
      ...user, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    users.set(userId, updated);
    users.set(user.email, updated);
    return updated;
  }
  return null;
};

export const updateUserPassword = async (userId, newPassword) => {
  const user = users.get(userId);
  if (user) {
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.updatedAt = new Date().toISOString();
    users.set(userId, user);
    users.set(user.email, user);
    return true;
  }
  return false;
};

// Password reset token
export const generatePasswordResetToken = (userId) => {
  const token = uuidv4();
  const expiry = Date.now() + 60 * 60 * 1000; // 1 hour
  
  passwordResetTokens.set(token, {
    userId,
    expiry,
    createdAt: Date.now()
  });
  
  return token;
};

export const verifyPasswordResetToken = (token) => {
  const data = passwordResetTokens.get(token);
  if (!data) return null;
  
  if (Date.now() > data.expiry) {
    passwordResetTokens.delete(token);
    return null;
  }
  
  return data;
};

export const consumePasswordResetToken = (token) => {
  const data = verifyPasswordResetToken(token);
  if (data) {
    passwordResetTokens.delete(token);
    return data;
  }
  return null;
};

// Session management
export const createSession = (userId) => {
  const sessionId = uuidv4();
  sessions.set(sessionId, {
    userId,
    createdAt: Date.now(),
    lastActivity: Date.now()
  });
  return sessionId;
};

export const validateSession = (sessionId) => {
  const session = sessions.get(sessionId);
  if (session) {
    // Session expires after 24 hours of inactivity
    if (Date.now() - session.lastActivity > 24 * 60 * 60 * 1000) {
      sessions.delete(sessionId);
      return null;
    }
    session.lastActivity = Date.now();
    return session;
  }
  return null;
};

// Sanitize user for response (remove sensitive data)
export const sanitizeUser = (user) => {
  if (!user) return null;
  
  const { password, ...safeUser } = user;
  return safeUser;
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  // At least 6 characters
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

export default {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  verifyToken,
  authMiddleware,
  optionalAuth,
  hashPassword,
  comparePassword,
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  updateUserPassword,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  consumePasswordResetToken,
  createSession,
  validateSession,
  sanitizeUser,
  isValidEmail,
  isValidPassword,
  checkAuthRateLimit,
  recordAuthAttempt,
  clearAuthAttempts
};
