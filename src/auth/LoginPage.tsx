import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";
import PublicHeader from "@/components/ui/PublicHeader";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/Admin", replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      setIsSubmitting(true);
      clearError();
      await login(email, password);
      navigate({ to: "/Admin", replace: true });
    } catch (err) {
      // Error is already set in context
      console.error("Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader active="Login" />
      <div style={{ ...styles.container, minHeight: "calc(100vh - 110px)", flex: 1 }}>
        <div style={styles.loginBox}>
          <h1 style={styles.title}>Admin Login</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Error Message */}
          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠️</span>
              <div>
                <p style={styles.errorTitle}>Login Failed</p>
                <p style={styles.errorMessage}>{error}</p>
              </div>
              <button type="button" style={styles.closeError} onClick={clearError}>
                ✕
              </button>
            </div>
          )}

          {/* Email Field */}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={isSubmitting}
              style={styles.input}
            />
          </div>

          {/* Password Field */}
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isSubmitting}
                style={styles.passwordInput}
              />
              <button
                type="button"
                style={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={styles.rememberMe}>
            <input type="checkbox" id="remember" disabled={isSubmitting} style={styles.checkbox} />
            <label htmlFor="remember" style={styles.rememberLabel}>
              Keep me logged in for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            style={{
              ...styles.submitButton,
              ...(isSubmitting && styles.submitButtonLoading),
            }}
          >
            {isSubmitting ? (
              <span style={styles.loadingText}>
                <span style={styles.spinner}>⟳</span> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Help Text */}
        <div style={styles.helpText}>
          <p>Demo credentials for testing:</p>
          <p style={styles.demoEmail}>Email: admin@example.com</p>
          <p style={styles.demoPassword}>Password: AdminPass123</p>
        </div>
      </div>
     </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  loginBox: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    marginBottom: "24px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    width: "100%",
    padding: "12px",
    paddingRight: "40px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  togglePassword: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px 8px",
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    marginBottom: "24px",
    fontSize: "14px",
  },
  checkbox: {
    marginRight: "8px",
    cursor: "pointer",
    width: "18px",
    height: "18px",
  },
  rememberLabel: {
    color: "#666",
    cursor: "pointer",
    margin: 0,
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  submitButtonLoading: {
    backgroundColor: "#0056b3",
    opacity: 0.8,
  },
  loadingText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    display: "inline-block",
    fontSize: "18px",
  },
  errorBox: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#fee",
    border: "1px solid #fcc",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "20px",
    gap: "12px",
  },
  errorIcon: {
    fontSize: "20px",
    flexShrink: 0,
  },
  errorTitle: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#c00",
  },
  errorMessage: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
  },
  closeError: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#999",
  },
  helpText: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #eee",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.6",
  },
  demoEmail: {
    margin: "0 0 4px 0",
    fontFamily: "monospace",
    color: "#333",
  },
  demoPassword: {
    margin: 0,
    fontFamily: "monospace",
    color: "#333",
  },
};
