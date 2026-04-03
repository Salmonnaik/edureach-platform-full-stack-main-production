import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { quotesContent } from "../data/content";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
export default function QuotesSection() {
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);
    // Auto-rotate every 5 seconds with fade effect
    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % quotesContent.length);
                setFade(true);
            }, 300);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    const goTo = (index) => {
        setFade(false);
        setTimeout(() => {
            setCurrent(index);
            setFade(true);
        }, 300);
    };
    const prev = () => goTo((current - 1 + quotesContent.length) % quotesContent.length);
    const next = () => goTo((current + 1) % quotesContent.length);
    return (_jsx("section", { className: "py-16 bg-cream", children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 text-center", children: [_jsx(Quote, { className: "w-10 h-10 text-maroon/30 mx-auto mb-6" }), _jsxs("div", { className: "relative min-h-[120px] flex items-center justify-center", children: [_jsx("button", { onClick: prev, className: "absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-maroon transition-colors duration-200", children: _jsx(ChevronLeft, { className: "w-6 h-6" }) }), _jsxs("div", { className: "px-10 transition-opacity duration-300", style: { opacity: fade ? 1 : 0 }, children: [_jsxs("p", { className: "font-heading text-2xl md:text-3xl text-gray-800 italic leading-relaxed mb-4", children: ["\u201C", quotesContent[current].text, "\u201D"] }), _jsxs("p", { className: "text-maroon font-semibold", children: ["\u2014 ", quotesContent[current].author] })] }), _jsx("button", { onClick: next, className: "absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-maroon transition-colors duration-200", children: _jsx(ChevronRight, { className: "w-6 h-6" }) })] }), _jsx("div", { className: "flex justify-center gap-2 mt-6", children: quotesContent.map((_, i) => (_jsx("button", { onClick: () => goTo(i), className: `w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-maroon w-6" : "bg-gray-300"}` }, i))) })] }) }));
}
