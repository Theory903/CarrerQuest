"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile?: {
    skills: string[];
    interests: string[];
    education: string | null;
    quizCompleted: boolean;
    quizResults: Record<string, unknown> | null;
  };
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User['profile']>) => Promise<boolean>;
  refreshAuth: () => Promise<boolean>;
  clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const TOKEN_KEY = 'careerquest_token';
const USER_KEY = 'careerquest_user';
const TOKEN_EXPIRY_KEY = 'careerquest_token_expiry';

// Backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const userStr = localStorage.getItem(USER_KEY);
        const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);

        if (token && userStr) {
          // Check if token is expired
          if (expiryStr) {
            const expiry = new Date(expiryStr);
            if (expiry < new Date()) {
              // Token expired, clear storage
              clearStorage();
              setState(prev => ({ ...prev, isLoading: false }));
              return;
            }
          }

          const user = JSON.parse(userStr);
          
          // Verify token with backend
          const isValid = await verifyToken(token);
          
          if (isValid) {
            setState({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            clearStorage();
            setState(prev => ({ ...prev, isLoading: false }));
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth init error:', error);
        clearStorage();
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  // Verify token with backend
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Clear storage
  const clearStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  };

  // Save auth to storage
  const saveAuth = (token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    // Set expiry (7 days from now)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toISOString());
  };

  // Login
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Login failed',
        }));
        return false;
      }

      saveAuth(data.token, data.user);
      
      setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Network error. Please try again.',
      }));
      return false;
    }
  }, []);

  // Register
  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Registration failed',
        }));
        return false;
      }

      saveAuth(data.token, data.user);
      
      setState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Network error. Please try again.',
      }));
      return false;
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    clearStorage();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // Update profile
  const updateProfile = useCallback(async (data: Partial<User['profile']>): Promise<boolean> => {
    if (!state.token) return false;

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`,
        },
        body: JSON.stringify({ profile: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        setState(prev => ({ ...prev, error: result.error }));
        return false;
      }

      // Update local state and storage
      const updatedUser = { ...state.user!, profile: { ...state.user?.profile, ...data } };
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
      }));

      return true;
    } catch {
      return false;
    }
  }, [state.token, state.user]);

  // Refresh auth
  const refreshAuth = useCallback(async (): Promise<boolean> => {
    if (!state.token) return false;

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${state.token}`,
        },
      });

      if (!response.ok) {
        logout();
        return false;
      }

      const data = await response.json();
      
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setState(prev => ({ ...prev, user: data.user }));
      
      return true;
    } catch {
      return false;
    }
  }, [state.token, logout]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Auto-refresh token check
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const checkExpiry = () => {
      const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);
      if (expiryStr) {
        const expiry = new Date(expiryStr);
        const now = new Date();
        
        // If token expires in less than 1 day, we could refresh it
        // For now, just check if expired
        if (expiry < now) {
          logout();
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkExpiry, 60000);
    return () => clearInterval(interval);
  }, [state.isAuthenticated, logout]);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    refreshAuth,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  redirectTo: string = '/students'
) {
  return function WithAuthComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (mounted && !isLoading && !isAuthenticated) {
        window.location.href = redirectTo;
      }
    }, [mounted, isLoading, isAuthenticated]);

    if (!mounted || isLoading) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default AuthContext;

