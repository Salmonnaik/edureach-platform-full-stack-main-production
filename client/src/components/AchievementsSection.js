import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { achievementsContent } from "../data/content";
export default function AchievementsSection() {
    return (_jsx("section", { className: "bg-maroon py-16", children: _jsx("div", { className: "max-w-7xl mx-auto px-4", children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: achievementsContent.stats.map((stat) => (_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl md:text-4xl font-bold text-white font-heading", children: stat.value }), _jsx("p", { className: "text-white/80 mt-2 text-sm", children: stat.label })] }, stat.label))) }) }) }));
}
