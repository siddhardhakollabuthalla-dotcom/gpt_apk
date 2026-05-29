import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Users,
  Briefcase,
  Bell,
  Award,
  Download,
  BookOpen,
  Building2,
  ShieldCheck,
  Wifi,
  Cpu,
  Camera,
  Droplets,
  Trophy,
  Library,
  FileText,
  ChevronRight,
} from "lucide-react";
const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Faculty", href: "#faculty" },
  { label: "Events", href: "/Events" },
  { label: "Login", href: "/Login" },
  { label: "Careers", href: "#careers" },
  { label: "Notices", href: "#notices" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate({ to: "/Admin" });
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Show specific error messages
      if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError(error.message || "Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="min-h-screen bg-background">
          {/* Top strip */}
          <div className="bg-navy text-navy-foreground text-xs">
            <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
              <span className="opacity-90">
                Government of Andhra Pradesh · State Board of Technical Education &amp; Training
              </span>
              <div className="flex items-center gap-5 opacity-90">
                <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" /> +91 90102 22173</span>
                <span className="hidden sm:inline-flex items-center gap-1.5"><Mail className="h-3 w-3" /> polytechnic.government173@gmail.com</span>
              </div>
            </div>
          </div>
    
          {/* Nav */}
          <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
            <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
              <a href="#home" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-navy text-gold grid place-items-center font-display font-bold">GP</div>
                <div className="leading-tight">
                  <div className="font-display font-semibold text-foreground">Government Polytechnic, Anakapalli</div>
                  <div className="text-[11px] text-muted-foreground">Knowledge is Power · Estd. 2008</div>
                </div>
              </a>
              <nav className="hidden lg:flex items-center gap-7 text-sm">
                {nav.map((n, i) => (
                  <a
                    key={n.label}
                    href={n.href}
                    className={`relative text-foreground/80 hover:text-foreground transition-colors ${i === 0 ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-6 after:bg-gold" : ""}`}
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
              <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-navy text-navy-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition">
                Contact Us
              </a>
            </div>
          </header>
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-zinc-900">

    <div className="min-h-screen flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
          >
            <h1 className="text-2xl font-bold mb-6">
              Admin Login
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              className="w-full border p-3 mb-4 rounded"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              className="w-full border p-3 mb-4 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;