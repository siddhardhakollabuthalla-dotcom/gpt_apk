import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { u as useAuth } from "./router-Bxzv1aIu.js";
import { P as PublicHeader } from "./PublicHeader-BJH-8ORm.js";
import "@tanstack/react-query";
import "lucide-react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/Admin", replace: true });
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit = async (e) => {
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
      console.error("Login failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(PublicHeader, { active: "Login" }),
    /* @__PURE__ */ jsx("div", { style: { ...styles.container, minHeight: "calc(100vh - 110px)", flex: 1 }, children: /* @__PURE__ */ jsxs("div", { style: styles.loginBox, children: [
      /* @__PURE__ */ jsx("h1", { style: styles.title, children: "Admin Login" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [
        error && /* @__PURE__ */ jsxs("div", { style: styles.errorBox, children: [
          /* @__PURE__ */ jsx("span", { style: styles.errorIcon, children: "⚠️" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { style: styles.errorTitle, children: "Login Failed" }),
            /* @__PURE__ */ jsx("p", { style: styles.errorMessage, children: error })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", style: styles.closeError, onClick: clearError, children: "✕" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", style: styles.label, children: "Email Address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              id: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "admin@example.com",
              required: true,
              disabled: isSubmitting,
              style: styles.input
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.formGroup, children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", style: styles.label, children: "Password" }),
          /* @__PURE__ */ jsxs("div", { style: styles.passwordContainer, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                id: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "••••••••",
                required: true,
                disabled: isSubmitting,
                style: styles.passwordInput
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                style: styles.togglePassword,
                onClick: () => setShowPassword(!showPassword),
                disabled: isSubmitting,
                children: showPassword ? "👁️" : "👁️‍🗨️"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.rememberMe, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", id: "remember", disabled: isSubmitting, style: styles.checkbox }),
          /* @__PURE__ */ jsx("label", { htmlFor: "remember", style: styles.rememberLabel, children: "Keep me logged in for 30 days" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting || !email || !password,
            style: {
              ...styles.submitButton,
              ...isSubmitting && styles.submitButtonLoading
            },
            children: isSubmitting ? /* @__PURE__ */ jsxs("span", { style: styles.loadingText, children: [
              /* @__PURE__ */ jsx("span", { style: styles.spinner, children: "⟳" }),
              " Logging in..."
            ] }) : "Login"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.helpText, children: [
        /* @__PURE__ */ jsx("p", { children: "Demo credentials for testing:" }),
        /* @__PURE__ */ jsx("p", { style: styles.demoEmail, children: "Email: admin@example.com" }),
        /* @__PURE__ */ jsx("p", { style: styles.demoPassword, children: "Password: AdminPass123" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
      ` })
  ] });
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "20px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  loginBox: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "400px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "8px",
    textAlign: "center"
  },
  form: {
    marginBottom: "24px"
  },
  formGroup: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none"
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  passwordInput: {
    width: "100%",
    padding: "12px",
    paddingRight: "40px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none"
  },
  togglePassword: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px 8px"
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    marginBottom: "24px",
    fontSize: "14px"
  },
  checkbox: {
    marginRight: "8px",
    cursor: "pointer",
    width: "18px",
    height: "18px"
  },
  rememberLabel: {
    color: "#666",
    cursor: "pointer",
    margin: 0
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
    transition: "background-color 0.2s"
  },
  submitButtonLoading: {
    backgroundColor: "#0056b3",
    opacity: 0.8
  },
  loadingText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  spinner: {
    display: "inline-block",
    fontSize: "18px"
  },
  errorBox: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#fee",
    border: "1px solid #fcc",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "20px",
    gap: "12px"
  },
  errorIcon: {
    fontSize: "20px",
    flexShrink: 0
  },
  errorTitle: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#c00"
  },
  errorMessage: {
    margin: 0,
    fontSize: "13px",
    color: "#666"
  },
  closeError: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#999"
  },
  helpText: {
    backgroundColor: "#f9f9f9",
    border: "1px solid #eee",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.6"
  },
  demoEmail: {
    margin: "0 0 4px 0",
    fontFamily: "monospace",
    color: "#333"
  },
  demoPassword: {
    margin: 0,
    fontFamily: "monospace",
    color: "#333"
  }
};
const SplitComponent = LoginPage;
export {
  SplitComponent as component
};
