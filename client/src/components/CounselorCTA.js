import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { images } from "../data/content";
import { PhoneCall } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function CounselorCTA({ onOpenCall }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleClick = () => {
        if (user) {
            onOpenCall();
        }
        else {
            navigate("/login");
        }
    };
    return (_jsxs("section", { className: "relative py-20 overflow-hidden", children: [_jsx("img", { src: images.moreStudents, alt: "Students", className: "absolute inset-0 w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-maroon-dark/80" }), _jsxs("div", { className: "relative z-10 max-w-4xl mx-auto px-4 text-center", children: [_jsx("p", { className: "text-amber-300 font-semibold text-sm uppercase tracking-wider mb-3", children: "Our Expert Counsellors Are Just a Click Away" }), _jsxs("h2", { className: "font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-4", children: ["Need Help Choosing ", _jsx("br", { className: "hidden sm:block" }), "The Right University For You?"] }), _jsx("p", { className: "text-white/80 text-lg max-w-2xl mx-auto mb-8", children: "Get personalized guidance on courses, admissions, fees, scholarships, and career paths." }), _jsxs("button", { onClick: handleClick, className: "inline-flex items-center gap-2 bg-white text-maroon px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-300 hover:text-maroon-dark transition-colors duration-300 shadow-lg", children: [_jsx(PhoneCall, { className: "w-5 h-5" }), "Talk to Counsellor"] })] })] }));
}
