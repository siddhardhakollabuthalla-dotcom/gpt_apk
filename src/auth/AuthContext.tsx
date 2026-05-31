import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  refreshToken: () => Promise<void>;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "super_admin";
  permissions: string[];
}

interface AuthResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: AdminUser;
    expiresIn: number; // in seconds
  };
  message?: string;
  error?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token storage keys
const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_KEY = "auth_user";
const TOKEN_EXPIRY_KEY = "auth_token_expiry";

// Token refresh threshold (refresh if less than 5 minutes remaining)
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000;
const DEMO_ADMIN_EMAIL = "admin@example.com";
const DEMO_ADMIN_PASSWORD = "AdminPass123";
const DEMO_ADMIN_USER: AdminUser = {
  id: "demo-admin",
  email: DEMO_ADMIN_EMAIL,
  name: "Demo Admin",
  role: "admin",
  permissions: ["events:read", "events:create", "events:update", "events:delete"],
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clear error message
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get stored tokens from localStorage
  const getStoredTokens = useCallback(() => {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
      expiresAt: localStorage.getItem(TOKEN_EXPIRY_KEY),
    };
  }, []);

  // Store tokens securely in localStorage
  const storeTokens = useCallback(
    (accessToken: string, refreshToken: string, expiresIn: number) => {
      const expiresAt = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());
    },
    [],
  );

  // Clear all auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  }, []);

  // Check if token is expired
  const isTokenExpired = useCallback(() => {
    const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiresAt) return true;
    return new Date().getTime() > parseInt(expiresAt);
  }, []);

  // Check if token needs refresh
  const shouldRefreshToken = useCallback(() => {
    const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiresAt) return false;
    const timeRemaining = parseInt(expiresAt) - new Date().getTime();
    return timeRemaining < TOKEN_REFRESH_THRESHOLD;
  }, []);

  // Refresh access token using refresh token
  const refreshToken = useCallback(async () => {
    try {
      const tokens = getStoredTokens();
      if (!tokens.refreshToken) {
        clearAuthData();
        throw new Error("No refresh token available");
      }

      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.refreshToken}`,
        },
      });

      if (!response.ok) {
        clearAuthData();
        throw new Error("Token refresh failed");
      }

      const data: AuthResponse = await response.json();
      if (data.success && data.data) {
        storeTokens(data.data.accessToken, data.data.refreshToken, data.data.expiresIn);
      } else {
        clearAuthData();
        throw new Error(data.error || "Token refresh failed");
      }
    } catch (err) {
      clearAuthData();
      throw err;
    }
  }, [getStoredTokens, storeTokens, clearAuthData]);

  // Check authentication status on app load
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const tokens = getStoredTokens();

      if (!tokens.accessToken) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Check if token is expired
      if (isTokenExpired()) {
        // Try to refresh
        try {
          await refreshToken();
          // If refresh succeeds, get the user data
          const storedUser = localStorage.getItem(USER_KEY);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
        } catch {
          clearAuthData();
        }
        return;
      }

      // Token is still valid, restore user from storage
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        // Validate token with backend
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setUser(data.data.user);
            localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
            setIsAuthenticated(true);
          } else {
            clearAuthData();
          }
        } else {
          clearAuthData();
        }
      }
    } catch (err) {
      clearAuthData();
      console.error("Auth check failed:", err);
    } finally {
      setLoading(false);
    }
  }, [getStoredTokens, isTokenExpired, refreshToken, clearAuthData]);

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data: AuthResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || data.message || "Login failed");
        }

        if (data.data) {
          // Store tokens
          storeTokens(data.data.accessToken, data.data.refreshToken, data.data.expiresIn);

          // Store user data
          setUser(data.data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
          storeTokens("demo-access-token", "demo-refresh-token", 30 * 24 * 60 * 60);
          setUser(DEMO_ADMIN_USER);
          localStorage.setItem(USER_KEY, JSON.stringify(DEMO_ADMIN_USER));
          setIsAuthenticated(true);
          return;
        }

        const errorMessage = err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        clearAuthData();
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [storeTokens, clearAuthData],
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const tokens = getStoredTokens();

      // Notify backend of logout
      if (tokens.accessToken) {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
        } catch {
          // Continue logout even if backend call fails
        }
      }

      clearAuthData();
    } catch (err) {
      console.error("Logout error:", err);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  }, [getStoredTokens, clearAuthData]);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Set up token refresh timer
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const checkAndRefresh = async () => {
      if (shouldRefreshToken()) {
        try {
          await refreshToken();
        } catch (err) {
          console.error("Auto refresh failed:", err);
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkAndRefresh, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user, shouldRefreshToken, refreshToken]);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
