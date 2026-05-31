import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";

export const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate({ to: "/Login", replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      // Still redirect even if logout fails
      navigate({ to: "/Login", replace: true });
    } finally {
      setIsLoggingOut(false);
      setShowConfirm(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.notAuthenticatedBox}>
          <h2>Not Authenticated</h2>
          <p>Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Admin Dashboard</h1>
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <p style={styles.userName}>{user?.name}</p>
              <p style={styles.userEmail}>{user?.email}</p>
              <span style={{ ...styles.badge, ...getBadgeStyle(user?.role) }}>{user?.role}</span>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={isLoggingOut}
              style={styles.logoutButton}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome, {user?.name}!</h2>
          <p style={styles.cardText}>
            You are successfully logged in. Your session will persist even if you refresh the page
            or close and reopen your browser.
          </p>

          <div style={styles.infoSection}>
            <h3 style={styles.infoTitle}>Session Information</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>User ID:</label>
                <code style={styles.infoValue}>{user?.id}</code>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Email:</label>
                <code style={styles.infoValue}>{user?.email}</code>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Role:</label>
                <code style={styles.infoValue}>{user?.role}</code>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Permissions:</label>
                <code style={styles.infoValue}>
                  {user?.permissions?.length ? user.permissions.join(", ") : "None"}
                </code>
              </div>
            </div>
          </div>

          <div style={styles.featuresList}>
            <h3 style={styles.infoTitle}>Authentication Features</h3>
            <ul style={styles.list}>
              <li>✅ Session persists across page refreshes</li>
              <li>✅ Session persists across browser restarts</li>
              <li>✅ Automatic token refresh before expiration</li>
              <li>✅ Secure JWT token storage</li>
              <li>✅ Automatic logout on token expiration</li>
              <li>✅ Protected routes with role-based access control</li>
              <li>✅ Smooth user experience without repeated logins</li>
            </ul>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Troubleshooting</h3>
          <p style={styles.cardText}>If you experience issues with session persistence:</p>
          <ul style={styles.list}>
            <li>Clear browser cookies and localStorage if you're stuck</li>
            <li>Check browser console (F12) for error messages</li>
            <li>Ensure your backend API is running and accessible</li>
            <li>Verify token endpoints: /api/auth/login, /api/auth/refresh, /api/auth/logout</li>
          </ul>
        </div>
      </main>

      {/* Logout Confirmation Dialog */}
      {showConfirm && (
        <div style={styles.overlay}>
          <div style={styles.confirmDialog}>
            <h3 style={styles.confirmTitle}>Confirm Logout</h3>
            <p style={styles.confirmMessage}>
              Are you sure you want to log out? You'll need to log in again to access this
              application.
            </p>
            <div style={styles.confirmButtons}>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isLoggingOut}
                style={styles.cancelButton}
              >
                Cancel
              </button>
              <button onClick={handleLogout} disabled={isLoggingOut} style={styles.confirmButton}>
                {isLoggingOut ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getBadgeStyle(role?: string): React.CSSProperties {
  switch (role) {
    case "super_admin":
      return {
        backgroundColor: "#fee",
        color: "#c00",
      };
    case "admin":
      return {
        backgroundColor: "#efe",
        color: "#060",
      };
    default:
      return {
        backgroundColor: "#eee",
        color: "#666",
      };
  }
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "600",
    margin: 0,
    color: "#1a1a1a",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  userInfo: {
    textAlign: "right",
  },
  userName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  userEmail: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#666",
  },
  badge: {
    display: "inline-block",
    marginTop: "8px",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  logoutButton: {
    padding: "10px 24px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "30px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 0,
    marginBottom: "12px",
  },
  cardText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
  },
  infoSection: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  infoTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 12px 0",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  infoItem: {
    backgroundColor: "#f9f9f9",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #eee",
  },
  infoLabel: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#666",
    marginBottom: "4px",
    textTransform: "uppercase",
  },
  infoValue: {
    display: "block",
    fontSize: "13px",
    color: "#333",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
  featuresList: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  list: {
    paddingLeft: "20px",
    margin: 0,
  },
  notAuthenticatedBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  confirmDialog: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "30px",
    maxWidth: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  confirmTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 12px 0",
  },
  confirmMessage: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
  },
  confirmButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
};
