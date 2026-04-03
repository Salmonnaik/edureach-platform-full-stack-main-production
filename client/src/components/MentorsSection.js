import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { mentorsContent } from "../data/content";
export default function MentorsSection({ onReachMentors }) {
    const sectionRef = useRef(null);
    const triggered = useRef(false);
    // Simple scroll check - when section is in view, call the callback
    useEffect(() => {
        const handleScroll = () => {
            if (triggered.current || !sectionRef.current || !onReachMentors)
                return;
            const rect = sectionRef.current.getBoundingClientRect();
            // When the section top is within the viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                triggered.current = true;
                onReachMentors();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [onReachMentors]);
    return (_jsx("section", { id: "mentors", ref: sectionRef, className: "py-20 bg-cream", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("p", { className: "text-maroon font-semibold text-sm uppercase tracking-wide mb-2", children: "Learn from the Best" }), _jsx("h2", { className: "font-heading text-3xl md:text-4xl font-bold text-gray-900", children: "Popular Mentors" })] }), _jsx("div", { className: "flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible", children: mentorsContent.map((mentor) => (_jsxs("div", { className: "min-w-[260px] md:min-w-0 bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300", children: [_jsx("img", { src: mentor.image, alt: mentor.name, className: "w-full h-56 object-cover" }), _jsxs("div", { className: "p-5", children: [_jsx("h3", { className: "font-heading text-lg font-semibold text-gray-900", children: mentor.name }), _jsx("p", { className: "text-maroon text-sm font-medium mb-2", children: mentor.role }), _jsx("p", { className: "text-gray-500 text-sm mb-2", children: mentor.bio }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Teaches: ", mentor.teaches] })] })] }, mentor.name))) })] }) }));
}
