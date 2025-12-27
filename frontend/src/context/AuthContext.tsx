import { createContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '../types';
import { authAPI } from '../services/api';

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = async () => {
    try {
      console.log('[AuthContext] Checking authentication...');
      const data = await authAPI.getProfile();
      console.log('[AuthContext] User authenticated:', data.user);
      
      const userData = {
        id: data. user._id || data.user.userId || '1',
        username: data. user.username,
        email: data.user. email,
        role: data. user.role || 'user',
        scanLimit: data.user.scanLimit || 10,
        scansUsed: data.user.scansUsed || 0,
      };
      
      console.log('[AuthContext] Setting user data:', userData);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error:  any) {
      console.log('[AuthContext] Not authenticated:', error.message);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Sign up new user
  const signup = async (username: string, email: string, password: string) => {
    try {
      console.log('[AuthContext] Signing up.. .');
      await authAPI.signup({ username, email, password });
      await checkAuth(); // Get user data after signup
    } catch (error:  any) {
      console.error('[AuthContext] Signup error:', error);
      throw new Error(error.response?.data?. error || 'Signup failed');
    }
  };

  // Login existing user
  const login = async (email: string, password: string) => {
    try {
      console.log('[AuthContext] Logging in...');
      await authAPI.login({ email, password });
      await checkAuth(); // Get user data after login
    } catch (error: any) {
      console.error('[AuthContext] Login error:', error);
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  // Logout current user
  const logout = async () => {
    try {
      console.log('[AuthContext] Logging out...');
      await authAPI.logout();
    } catch (error) {
      console.error('[AuthContext] Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}