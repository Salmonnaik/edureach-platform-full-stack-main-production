import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { loginUser, loginWithGoogle } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const response = await loginUser({ email, password });
            login(response.token);
            navigate("/dashboard");
        }
        catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setError("");
        try {
            const response = await loginWithGoogle();
            login(response.token);
            navigate("/dashboard");
        }
        catch (err) {
            console.error("Google login failed:", err);
            setError(err.message || "Google sign-in failed. Please try again.");
        }
        finally {
            setGoogleLoading(false);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter")
            handleLogin();
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#faf7f2] flex", children: [_jsxs("div", { className: "hidden lg:flex lg:w-[52%] bg-slate-900 flex-col justify-between p-12 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 w-[480px] h-[480px] bg-amber-500/6 rounded-full blur-[100px] pointer-events-none" }), _jsx("div", { className: "absolute bottom-0 left-0 w-[320px] h-[320px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" }), _jsx("div", { className: "absolute inset-0 opacity-[0.025]", style: {
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        } }), _jsxs("div", { className: "relative z-10 flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold font-serif text-xl shadow-[0_4px_16px_rgba(245,158,11,0.4)]", children: "E" }), _jsxs("span", { className: "font-serif text-2xl font-semibold text-white", children: ["Edu", _jsx("span", { className: "text-amber-400", children: "Reach" })] })] }), _jsxs("div", { className: "relative z-10 flex-1 flex flex-col justify-center py-12", children: [_jsx("div", { className: "font-serif text-7xl text-amber-500/20 leading-none mb-2 select-none", children: "\"" }), _jsx("blockquote", { className: "font-serif text-2xl text-white/85 leading-snug italic mb-8 max-w-sm", children: "Education is the most powerful weapon you can use to change the world." }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold text-sm", children: "NM" }), _jsxs("div", { children: [_jsx("div", { className: "text-white text-sm font-semibold", children: "Nelson Mandela" }), _jsx("div", { className: "text-slate-400 text-xs font-mono", children: "Statesman & Educator" })] })] })] }), _jsx("div", { className: "relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/8", children: [
                            { value: "15K+", label: "Alumni" },
                            { value: "92%", label: "Placement" },
                            { value: "500+", label: "Companies" },
                        ].map((s) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-serif text-2xl font-bold text-amber-400 leading-none", children: s.value }), _jsx("div", { className: "text-slate-500 text-[10px] font-mono uppercase tracking-widest mt-1", children: s.label })] }, s.label))) })] }), _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16", children: [_jsxs("div", { className: "flex lg:hidden items-center gap-2.5 mb-10", children: [_jsx("div", { className: "w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold font-serif text-lg", children: "E" }), _jsxs("span", { className: "font-serif text-xl font-semibold text-slate-900", children: ["Edu", _jsx("span", { className: "text-amber-500", children: "Reach" })] })] }), _jsxs("div", { className: "w-full max-w-[400px]", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("span", { className: "block w-6 h-px bg-amber-500" }), _jsx("span", { className: "font-mono text-[10px] tracking-widest uppercase text-amber-600 font-semibold", children: "Admin Portal" })] }), _jsx("h2", { className: "font-serif text-slate-900 font-bold leading-tight mb-2", style: { fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }, children: "Welcome back" }), _jsx("p", { className: "text-slate-500 text-sm leading-relaxed mb-8", children: "Sign in to access your EduReach dashboard and manage admissions." }), error && (_jsxs("div", { className: "flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 mb-6 animate-[fadeIn_0.2s_ease]", children: [_jsx("span", { className: "text-rose-500 text-base mt-0.5 shrink-0", children: "\u26A0" }), _jsx("p", { className: "text-rose-700 text-sm leading-snug", children: error })] })), _jsxs("div", { className: "flex flex-col gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none", children: "\u2709" }), _jsx("input", { type: "email", placeholder: "you@edureach.ac.in", value: email, onChange: (e) => setEmail(e.target.value), onKeyDown: handleKeyDown, className: "w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition-all duration-200" })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("label", { className: "text-xs font-semibold text-slate-700 uppercase tracking-wider", children: "Password" }), _jsx("button", { type: "button", className: "text-xs text-amber-600 hover:text-amber-700 font-medium transition-colors", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none", children: "\uD83D\uDD11" }), _jsx("input", { type: showPass ? "text" : "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), onKeyDown: handleKeyDown, className: "w-full pl-10 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 transition-all duration-200" }), _jsx("button", { type: "button", onClick: () => setShowPass(!showPass), className: "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm transition-colors", "aria-label": showPass ? "Hide password" : "Show password", children: showPass ? "🙈" : "👁" })] })] }), _jsxs("label", { className: "flex items-center gap-2.5 cursor-pointer group", children: [_jsx("input", { type: "checkbox", className: "w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400 focus:ring-offset-0 cursor-pointer accent-amber-500" }), _jsx("span", { className: "text-sm text-slate-600 group-hover:text-slate-800 transition-colors", children: "Keep me signed in" })] }), _jsx("button", { onClick: handleLogin, disabled: loading, className: "w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold text-sm shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_12px_36px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_24px_rgba(245,158,11,0.35)] transition-all duration-300", children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "w-4 h-4 animate-spin", viewBox: "0 0 24 24", fill: "none", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" })] }), "Signing in\u2026"] })) : (_jsx(_Fragment, { children: "Sign In to Dashboard \u2192" })) })] }), _jsxs("div", { className: "flex items-center gap-4 my-7", children: [_jsx("div", { className: "flex-1 h-px bg-slate-200" }), _jsx("span", { className: "text-xs text-slate-400 font-mono uppercase tracking-wider", children: "or" }), _jsx("div", { className: "flex-1 h-px bg-slate-200" })] }), _jsx("button", { onClick: handleGoogleSignIn, disabled: googleLoading, className: "w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-amber-300 hover:bg-amber-50/40 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed", children: googleLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "w-4 h-4 animate-spin", viewBox: "0 0 24 24", fill: "none", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" })] }), "Connecting to Google\u2026"] })) : (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", children: [_jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), _jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), _jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" }), _jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })] }), "Continue with Google"] })) }), _jsxs("p", { className: "text-center text-sm text-slate-500 mt-8", children: ["New to EduReach?", " ", _jsx("a", { href: "/signup", className: "text-amber-600 font-semibold hover:text-amber-700 transition-colors", children: "Create an account \u2192" })] }), _jsxs("p", { className: "text-center text-[10px] text-slate-400 font-mono mt-6 leading-relaxed", children: ["By signing in you agree to EduReach's", " ", _jsx("a", { href: "/terms", className: "underline hover:text-slate-600 transition-colors", children: "Terms" }), " ", "and", " ", _jsx("a", { href: "/privacy", className: "underline hover:text-slate-600 transition-colors", children: "Privacy Policy" }), "."] })] })] }), _jsx("style", { children: `@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }` })] }));
};
export default Login;
