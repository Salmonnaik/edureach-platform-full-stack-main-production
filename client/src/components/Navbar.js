import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { navLinks } from "../data/content";
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const handleLogout = () => {
        logout();
        navigate("/");
        setMenuOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: `navbar sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`, children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 flex items-center justify-between h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [_jsx(GraduationCap, { className: "w-8 h-8 text-red-600" }), _jsx("span", { className: "font-bold text-xl text-gray-900", children: "EduReach" })] }), _jsx("div", { className: "hidden md:flex items-center gap-6", children: navLinks.map((link) => (_jsx("a", { href: link.href, className: "text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200", children: link.label }, link.label))) }), _jsx("div", { className: "hidden md:flex items-center gap-3", children: user ? (_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg", children: [_jsx(User, { className: "w-4 h-4 text-gray-600" }), _jsxs("span", { className: "text-sm font-medium text-gray-700", children: ["Hi, ", user.name.split(" ")[0]] })] }), _jsxs("button", { onClick: handleLogout, className: "btn btn-secondary", children: [_jsx(LogOut, { className: "w-4 h-4" }), "Logout"] })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "btn btn-secondary", children: "Login" }), _jsx(Link, { to: "/signup", className: "btn btn-primary", children: "Sign Up" })] })) }), _jsx("button", { onClick: () => setMenuOpen(!menuOpen), className: "md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200", children: menuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }) }), menuOpen && (_jsx("div", { className: "md:hidden bg-white border-b border-gray-200 shadow-lg", children: _jsxs("div", { className: "px-6 py-4 space-y-3", children: [navLinks.map((link) => (_jsx("a", { href: link.href, onClick: () => setMenuOpen(false), className: "block text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors duration-200", children: link.label }, link.label))), _jsx("div", { className: "pt-4 border-t border-gray-200", children: user ? (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg", children: [_jsx(User, { className: "w-4 h-4 text-gray-600" }), _jsxs("span", { className: "text-sm font-medium text-gray-700", children: ["Hi, ", user.name.split(" ")[0]] })] }), _jsxs("button", { onClick: handleLogout, className: "btn btn-secondary w-full", children: [_jsx(LogOut, { className: "w-4 h-4" }), "Logout"] })] })) : (_jsxs("div", { className: "space-y-3", children: [_jsx(Link, { to: "/login", onClick: () => setMenuOpen(false), className: "btn btn-secondary w-full", children: "Login" }), _jsx(Link, { to: "/signup", onClick: () => setMenuOpen(false), className: "btn btn-primary w-full", children: "Sign Up" })] })) })] }) }))] }));
}
