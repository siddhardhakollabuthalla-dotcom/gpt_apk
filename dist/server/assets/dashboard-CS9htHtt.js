import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { u as useAuth } from "./router-Bxzv1aIu.js";
import "@tanstack/react-query";
const Dashboard = () => {
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
      navigate({ to: "/Login", replace: true });
    } finally {
      setIsLoggingOut(false);
      setShowConfirm(false);
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxs("div", { style: styles.notAuthenticatedBox, children: [
      /* @__PURE__ */ jsx("h2", { children: "Not Authenticated" }),
      /* @__PURE__ */ jsx("p", { children: "Please log in to access this page." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsx("header", { style: styles.header, children: /* @__PURE__ */ jsxs("div", { style: styles.headerContent, children: [
      /* @__PURE__ */ jsx("h1", { style: styles.headerTitle, children: "Admin Dashboard" }),
      /* @__PURE__ */ jsxs("div", { style: styles.userSection, children: [
        /* @__PURE__ */ jsxs("div", { style: styles.userInfo, children: [
          /* @__PURE__ */ jsx("p", { style: styles.userName, children: user?.name }),
          /* @__PURE__ */ jsx("p", { style: styles.userEmail, children: user?.email }),
          /* @__PURE__ */ jsx("span", { style: { ...styles.badge, ...getBadgeStyle(user?.role) }, children: user?.role })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowConfirm(true),
            disabled: isLoggingOut,
            style: styles.logoutButton,
            children: isLoggingOut ? "Logging out..." : "Logout"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { style: styles.main, children: [
      /* @__PURE__ */ jsxs("div", { style: styles.card, children: [
        /* @__PURE__ */ jsxs("h2", { style: styles.cardTitle, children: [
          "Welcome, ",
          user?.name,
          "!"
        ] }),
        /* @__PURE__ */ jsx("p", { style: styles.cardText, children: "You are successfully logged in. Your session will persist even if you refresh the page or close and reopen your browser." }),
        /* @__PURE__ */ jsxs("div", { style: styles.infoSection, children: [
          /* @__PURE__ */ jsx("h3", { style: styles.infoTitle, children: "Session Information" }),
          /* @__PURE__ */ jsxs("div", { style: styles.infoGrid, children: [
            /* @__PURE__ */ jsxs("div", { style: styles.infoItem, children: [
              /* @__PURE__ */ jsx("label", { style: styles.infoLabel, children: "User ID:" }),
              /* @__PURE__ */ jsx("code", { style: styles.infoValue, children: user?.id })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: styles.infoItem, children: [
              /* @__PURE__ */ jsx("label", { style: styles.infoLabel, children: "Email:" }),
              /* @__PURE__ */ jsx("code", { style: styles.infoValue, children: user?.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: styles.infoItem, children: [
              /* @__PURE__ */ jsx("label", { style: styles.infoLabel, children: "Role:" }),
              /* @__PURE__ */ jsx("code", { style: styles.infoValue, children: user?.role })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: styles.infoItem, children: [
              /* @__PURE__ */ jsx("label", { style: styles.infoLabel, children: "Permissions:" }),
              /* @__PURE__ */ jsx("code", { style: styles.infoValue, children: user?.permissions?.length ? user.permissions.join(", ") : "None" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.featuresList, children: [
          /* @__PURE__ */ jsx("h3", { style: styles.infoTitle, children: "Authentication Features" }),
          /* @__PURE__ */ jsxs("ul", { style: styles.list, children: [
            /* @__PURE__ */ jsx("li", { children: "✅ Session persists across page refreshes" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Session persists across browser restarts" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Automatic token refresh before expiration" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Secure JWT token storage" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Automatic logout on token expiration" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Protected routes with role-based access control" }),
            /* @__PURE__ */ jsx("li", { children: "✅ Smooth user experience without repeated logins" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.card, children: [
        /* @__PURE__ */ jsx("h3", { style: styles.cardTitle, children: "Troubleshooting" }),
        /* @__PURE__ */ jsx("p", { style: styles.cardText, children: "If you experience issues with session persistence:" }),
        /* @__PURE__ */ jsxs("ul", { style: styles.list, children: [
          /* @__PURE__ */ jsx("li", { children: "Clear browser cookies and localStorage if you're stuck" }),
          /* @__PURE__ */ jsx("li", { children: "Check browser console (F12) for error messages" }),
          /* @__PURE__ */ jsx("li", { children: "Ensure your backend API is running and accessible" }),
          /* @__PURE__ */ jsx("li", { children: "Verify token endpoints: /api/auth/login, /api/auth/refresh, /api/auth/logout" })
        ] })
      ] })
    ] }),
    showConfirm && /* @__PURE__ */ jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxs("div", { style: styles.confirmDialog, children: [
      /* @__PURE__ */ jsx("h3", { style: styles.confirmTitle, children: "Confirm Logout" }),
      /* @__PURE__ */ jsx("p", { style: styles.confirmMessage, children: "Are you sure you want to log out? You'll need to log in again to access this application." }),
      /* @__PURE__ */ jsxs("div", { style: styles.confirmButtons, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowConfirm(false),
            disabled: isLoggingOut,
            style: styles.cancelButton,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx("button", { onClick: handleLogout, disabled: isLoggingOut, style: styles.confirmButton, children: isLoggingOut ? "Logging out..." : "Yes, Logout" })
      ] })
    ] }) })
  ] });
};
function getBadgeStyle(role) {
  switch (role) {
    case "super_admin":
      return {
        backgroundColor: "#fee",
        color: "#c00"
      };
    case "admin":
      return {
        backgroundColor: "#efe",
        color: "#060"
      };
    default:
      return {
        backgroundColor: "#eee",
        color: "#666"
      };
  }
}
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px"
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "600",
    margin: 0,
    color: "#1a1a1a"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  userInfo: {
    textAlign: "right"
  },
  userName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#333"
  },
  userEmail: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#666"
  },
  badge: {
    display: "inline-block",
    marginTop: "8px",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "capitalize"
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
    transition: "background-color 0.2s"
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "30px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 0,
    marginBottom: "12px"
  },
  cardText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    margin: "0 0 20px 0"
  },
  infoSection: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #eee"
  },
  infoTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 12px 0"
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px"
  },
  infoItem: {
    backgroundColor: "#f9f9f9",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #eee"
  },
  infoLabel: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#666",
    marginBottom: "4px",
    textTransform: "uppercase"
  },
  infoValue: {
    display: "block",
    fontSize: "13px",
    color: "#333",
    fontFamily: "monospace",
    wordBreak: "break-all"
  },
  featuresList: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #eee"
  },
  list: {
    paddingLeft: "20px",
    margin: 0
  },
  notAuthenticatedBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
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
    zIndex: 1e3
  },
  confirmDialog: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "30px",
    maxWidth: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  confirmTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 12px 0"
  },
  confirmMessage: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    margin: "0 0 20px 0"
  },
  confirmButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end"
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer"
  }
};
function DashboardRoute() {
  const {
    isAuthenticated,
    loading
  } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gray-100 text-gray-600", children: "Loading..." });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/Login", replace: true });
  }
  return /* @__PURE__ */ jsx(Dashboard, {});
}
export {
  DashboardRoute as component
};
