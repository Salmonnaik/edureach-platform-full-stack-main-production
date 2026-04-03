import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import SignupPopup from "../components/SignupPopup";
import CallPopup from "../components/CallPopup";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AchievementsSection from "../components/AchievementsSection";
import CoursesSection from "../components/CoursesSection";
import QuotesSection from "../components/QuotesSection";
import Footer from "../components/Footer";
import { C, FONTS } from "../styles/styles";
// Simple HomePage without complex JSX structure
export default function HomePage() {
    const { user } = useAuth();
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                obs.disconnect();
            }
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => {
            obs.disconnect();
        };
    }, []);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [showCallPopup, setShowCallPopup] = useState(false);
    return (_jsxs("div", { style: { minHeight: "100vh", background: C.cream }, children: [_jsx(HeroSection, {}), _jsx(AboutSection, {}), _jsx(AchievementsSection, {}), _jsx(CoursesSection, {}), _jsx(QuotesSection, {}), _jsx(Footer, {}), !user && (_jsxs("div", { style: { textAlign: "center", padding: "60px 20px" }, children: [_jsx("h2", { style: { fontFamily: "Georgia, serif", fontSize: "2rem", color: C.navy, marginBottom: "20px" }, children: "Sign Up to Access All Features" }), _jsx("p", { style: { fontFamily: FONTS.body, fontSize: "1.1rem", color: C.slate600, maxWidth: "400px", margin: "0 auto" }, children: "Create your account to unlock campus life, events, and AI counselor features." }), _jsx("button", { onClick: () => setShowSignupPopup(true), style: {
                            padding: "14px 28px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                            color: "#0b1628",
                            fontFamily: FONTS.body,
                            fontSize: "1rem",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }, children: "Sign Up Now" })] })), showSignupPopup && _jsx(SignupPopup, { show: showSignupPopup, onClose: () => setShowSignupPopup(false) }), showCallPopup && _jsx(CallPopup, { open: showCallPopup, onClose: () => setShowCallPopup(false) })] }));
}
