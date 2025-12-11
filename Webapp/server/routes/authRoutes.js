import express from 'express';
import { 
  generateToken, 
  generateRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  createUser, 
  findUserByEmail, 
  findUserById,
  updateUser,
  updateUserPassword,
  comparePassword,
  authMiddleware,
  sanitizeUser,
  isValidEmail,
  isValidPassword,
  generatePasswordResetToken,
  consumePasswordResetToken,
  checkAuthRateLimit,
  recordAuthAttempt,
  clearAuthAttempts
} from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Name, email, and password are required',
        code: 'MISSING_FIELDS'
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ 
        error: 'Name must be at least 2 characters',
        code: 'INVALID_NAME'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        error: 'Please enter a valid email address',
        code: 'INVALID_EMAIL'
      });
    }

    const passwordCheck = isValidPassword(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({ 
        error: passwordCheck.message,
        code: 'WEAK_PASSWORD'
      });
    }

    // Check if user exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'An account with this email already exists',
        code: 'EMAIL_EXISTS'
      });
    }

    // Create user
    const user = await createUser({
      name: name.trim(),
      email,
      password,
      role: 'student',
      profile: {
        skills: [],
        interests: [],
        education: null,
        quizCompleted: false,
        quizResults: null
      }
    });

    // Generate tokens
    const token = generateToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      message: 'Registration successful',
      user: sanitizeUser(user),
      token,
      refreshToken
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed. Please try again.',
      code: 'REGISTRATION_FAILED'
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const clientIp = req.ip || req.headers['x-forwarded-for'] || 'unknown';

    // Check rate limit
    const rateLimit = checkAuthRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return res.status(429).json({ 
        error: rateLimit.message,
        code: 'RATE_LIMITED',
        unlockTime: rateLimit.unlockTime
      });
    }

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required',
        code: 'MISSING_FIELDS'
      });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      recordAuthAttempt(clientIp);
      return res.status(401).json({ 
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      recordAuthAttempt(clientIp);
      return res.status(401).json({ 
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Clear rate limit on success
    clearAuthAttempts(clientIp);

    // Generate tokens
    const token = generateToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      message: 'Login successful',
      user: sanitizeUser(user),
      token,
      refreshToken
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed. Please try again.',
      code: 'LOGIN_FAILED'
    });
  }
});

// POST /api/auth/refresh - Refresh access token
router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ 
        error: 'Refresh token is required',
        code: 'MISSING_TOKEN'
      });
    }

    const tokenData = verifyRefreshToken(refreshToken);
    if (!tokenData) {
      return res.status(401).json({ 
        error: 'Invalid or expired refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      });
    }

    const user = findUserById(tokenData.userId);
    if (!user) {
      revokeRefreshToken(refreshToken);
      return res.status(401).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Generate new access token
    const newToken = generateToken(user.id, user.email);

    res.json({
      token: newToken,
      user: sanitizeUser(user)
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ 
      error: 'Token refresh failed',
      code: 'REFRESH_FAILED'
    });
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      revokeRefreshToken(refreshToken);
    }

    res.json({ 
      message: 'Logged out successfully',
      success: true
    });

  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authMiddleware, (req, res) => {
  try {
    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      user: sanitizeUser(user)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch user',
      code: 'FETCH_FAILED'
    });
  }
});

// PUT /api/auth/profile - Update user profile
router.put('/profile', authMiddleware, (req, res) => {
  try {
    const { name, profile } = req.body;
    const user = findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const updates = {};
    if (name && name.trim().length >= 2) {
      updates.name = name.trim();
    }
    if (profile) {
      updates.profile = { ...user.profile, ...profile };
    }

    const updated = updateUser(req.user.userId, updates);

    res.json({
      message: 'Profile updated successfully',
      user: sanitizeUser(updated)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update profile',
      code: 'UPDATE_FAILED'
    });
  }
});

// PUT /api/auth/password - Change password
router.put('/password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Current and new password are required',
        code: 'MISSING_FIELDS'
      });
    }

    const passwordCheck = isValidPassword(newPassword);
    if (!passwordCheck.valid) {
      return res.status(400).json({ 
        error: passwordCheck.message,
        code: 'WEAK_PASSWORD'
      });
    }

    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Verify current password
    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ 
        error: 'Current password is incorrect',
        code: 'INVALID_PASSWORD'
      });
    }

    // Update password
    await updateUserPassword(req.user.userId, newPassword);

    res.json({
      message: 'Password updated successfully',
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update password',
      code: 'UPDATE_FAILED'
    });
  }
});

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: 'Email is required',
        code: 'MISSING_EMAIL'
      });
    }

    const user = findUserByEmail(email);
    
    // Always return success to prevent email enumeration
    if (user) {
      const resetToken = generatePasswordResetToken(user.id);
      // In production, send email with reset link
      console.log(`Password reset token for ${email}: ${resetToken}`);
    }

    res.json({
      message: 'If an account exists with this email, you will receive a password reset link.',
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to process request',
      code: 'REQUEST_FAILED'
    });
  }
});

// POST /api/auth/reset-password - Reset password with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ 
        error: 'Token and new password are required',
        code: 'MISSING_FIELDS'
      });
    }

    const passwordCheck = isValidPassword(newPassword);
    if (!passwordCheck.valid) {
      return res.status(400).json({ 
        error: passwordCheck.message,
        code: 'WEAK_PASSWORD'
      });
    }

    const tokenData = consumePasswordResetToken(token);
    if (!tokenData) {
      return res.status(400).json({ 
        error: 'Invalid or expired reset token',
        code: 'INVALID_TOKEN'
      });
    }

    await updateUserPassword(tokenData.userId, newPassword);

    res.json({
      message: 'Password reset successful. You can now login with your new password.',
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to reset password',
      code: 'RESET_FAILED'
    });
  }
});

// POST /api/auth/verify - Verify token validity
router.post('/verify', authMiddleware, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user 
  });
});

// DELETE /api/auth/account - Delete account
router.delete('/account', authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ 
        error: 'Password is required to delete account',
        code: 'MISSING_PASSWORD'
      });
    }

    const user = findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ 
        error: 'Incorrect password',
        code: 'INVALID_PASSWORD'
      });
    }

    // In production, properly delete user data
    // For now, we'll just mark as deleted
    updateUser(req.user.userId, { 
      deleted: true, 
      deletedAt: new Date().toISOString() 
    });

    res.json({
      message: 'Account deleted successfully',
      success: true
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete account',
      code: 'DELETE_FAILED'
    });
  }
});

export default router;
