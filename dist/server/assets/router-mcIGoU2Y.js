import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect, createContext, useContext } from "react";
const AuthContext = createContext(void 0);
const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const USER_KEY = "auth_user";
const TOKEN_EXPIRY_KEY = "auth_token_expiry";
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1e3;
const DEMO_ADMIN_EMAIL = "admin@example.com";
const DEMO_ADMIN_PASSWORD = "AdminPass123";
const DEMO_ADMIN_USER = {
  id: "demo-admin",
  email: DEMO_ADMIN_EMAIL,
  name: "Demo Admin",
  role: "admin",
  permissions: ["events:read", "events:create", "events:update", "events:delete"]
};
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  const getStoredTokens = useCallback(() => {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
      expiresAt: localStorage.getItem(TOKEN_EXPIRY_KEY)
    };
  }, []);
  const storeTokens = useCallback(
    (accessToken, refreshToken2, expiresIn) => {
      const expiresAt = (/* @__PURE__ */ new Date()).getTime() + expiresIn * 1e3;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken2);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());
    },
    []
  );
  const clearAuthData = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  }, []);
  const isTokenExpired = useCallback(() => {
    const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiresAt) return true;
    return (/* @__PURE__ */ new Date()).getTime() > parseInt(expiresAt);
  }, []);
  const shouldRefreshToken = useCallback(() => {
    const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiresAt) return false;
    const timeRemaining = parseInt(expiresAt) - (/* @__PURE__ */ new Date()).getTime();
    return timeRemaining < TOKEN_REFRESH_THRESHOLD;
  }, []);
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
          Authorization: `Bearer ${tokens.refreshToken}`
        }
      });
      if (!response.ok) {
        clearAuthData();
        throw new Error("Token refresh failed");
      }
      const data = await response.json();
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
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const tokens = getStoredTokens();
      if (!tokens.accessToken) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      if (isTokenExpired()) {
        try {
          await refreshToken();
          const storedUser2 = localStorage.getItem(USER_KEY);
          if (storedUser2) {
            setUser(JSON.parse(storedUser2));
            setIsAuthenticated(true);
          }
        } catch {
          clearAuthData();
        }
        return;
      }
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.accessToken}`
          }
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
  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || data.message || "Login failed");
        }
        if (data.data) {
          storeTokens(data.data.accessToken, data.data.refreshToken, data.data.expiresIn);
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
    [storeTokens, clearAuthData]
  );
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const tokens = getStoredTokens();
      if (tokens.accessToken) {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.accessToken}`
            }
          });
        } catch {
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
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
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
    const interval = setInterval(checkAndRefresh, 6e4);
    return () => clearInterval(interval);
  }, [isAuthenticated, shouldRefreshToken, refreshToken]);
  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    clearError,
    refreshToken
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value, children });
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
const appCss = "/assets/styles-C6k_3YJp.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Government Polytechnic, Anakapalli" },
      { name: "description", content: "Government Polytechnic, Anakapalli — SBTET diploma programs in CME and ECE." },
      { property: "og:title", content: "Government Polytechnic, Anakapalli" },
      { name: "twitter:title", content: "Government Polytechnic, Anakapalli" },
      { property: "og:description", content: "Government Polytechnic, Anakapalli — SBTET diploma programs in CME and ECE." },
      { name: "twitter:description", content: "Government Polytechnic, Anakapalli — SBTET diploma programs in CME and ECE." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d0547db-e233-43e9-bc83-717f57831d03/id-preview-6d55f016--22e77a97-1a82-4853-98ee-390262d5d19b.lovable.app-1779782148465.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d0547db-e233-43e9-bc83-717f57831d03/id-preview-6d55f016--22e77a97-1a82-4853-98ee-390262d5d19b.lovable.app-1779782148465.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$7 = () => import("./dashboard-DHaPI0em.js");
const Route$7 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Auth Dashboard - Government Polytechnic, Anakapalli"
    }, {
      name: "description",
      content: "Persistent session dashboard for Government Polytechnic, Anakapalli admins."
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./Login-DnSITtYv.js");
const Route$6 = createFileRoute("/Login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  head: () => ({
    meta: [{
      title: "Admin Login - Government Polytechnic, Anakapalli"
    }, {
      name: "description",
      content: "Login to the admin portal for Government Polytechnic, Anakapalli."
    }]
  })
});
const $$splitComponentImporter$5 = () => import("./Events-1hnHu09k.js");
const Route$5 = createFileRoute("/Events")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Events — Government Polytechnic, Anakapalli"
    }, {
      name: "description",
      content: "Browse upcoming college events, workshops, celebrations, and notices for Government Polytechnic, Anakapalli."
    }]
  })
});
const $$splitComponentImporter$4 = () => import("./EditEvent-DDDtwuCC.js");
const Route$4 = createFileRoute("/EditEvent")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  validateSearch: (search) => ({
    eventId: search.eventId
  }),
  head: () => ({
    meta: [{
      title: "Edit Event — Government Polytechnic, Anakapalli"
    }, {
      name: "description",
      content: "Edit college event announcement"
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./AuthLogin-GzPAgu57.js");
const Route$3 = createFileRoute("/AuthLogin")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Persistent Admin Login - Government Polytechnic, Anakapalli"
    }, {
      name: "description",
      content: "Token-based admin login for Government Polytechnic, Anakapalli."
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./Admin-7CGWt-2k.js");
const Route$2 = createFileRoute("/Admin")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Admin Dashboard - Government Polytechnic, Anakapalli"
    }, {
      name: "description",
      content: "Admin dashboard for managing Government Polytechnic, Anakapalli events and data."
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./AddEvent-Bpv8EJ9a.js");
const Route$1 = createFileRoute("/AddEvent")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "Add Event — Government Polytechnic, Anakapalli"
    }, {
      name: "description",
      content: "Create a new event announcement"
    }]
  })
});
const $$splitComponentImporter = () => import("./index-Csoihw1H.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: () => ({
    meta: [{
      title: "Government Polytechnic, Anakapalli — SBTET Diploma in CME & ECE"
    }, {
      name: "description",
      content: "Government Polytechnic, Anakapalli — SBTET-recognized diploma programs in Computer Engineering and Electronics & Communication on a 9.74-acre campus."
    }]
  })
});
const DashboardRoute = Route$7.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$6.update({
  id: "/Login",
  path: "/Login",
  getParentRoute: () => Route$8
});
const EventsRoute = Route$5.update({
  id: "/Events",
  path: "/Events",
  getParentRoute: () => Route$8
});
const EditEventRoute = Route$4.update({
  id: "/EditEvent",
  path: "/EditEvent",
  getParentRoute: () => Route$8
});
const AuthLoginRoute = Route$3.update({
  id: "/AuthLogin",
  path: "/AuthLogin",
  getParentRoute: () => Route$8
});
const AdminRoute = Route$2.update({
  id: "/Admin",
  path: "/Admin",
  getParentRoute: () => Route$8
});
const AddEventRoute = Route$1.update({
  id: "/AddEvent",
  path: "/AddEvent",
  getParentRoute: () => Route$8
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  AddEventRoute,
  AdminRoute,
  AuthLoginRoute,
  EditEventRoute,
  EventsRoute,
  LoginRoute,
  DashboardRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useAuth as u
};
