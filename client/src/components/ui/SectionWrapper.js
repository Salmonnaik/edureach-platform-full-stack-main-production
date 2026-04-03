import { jsx as _jsx } from "react/jsx-runtime";
export default function SectionWrapper({ children, className = "", id, background = "white" }) {
    const backgrounds = {
        white: "bg-white",
        gray: "bg-gray-50",
        gradient: "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    };
    return (_jsx("section", { id: id, className: `w-full py-16 px-6 ${backgrounds[background]} ${className}`, children: _jsx("div", { className: "max-w-7xl mx-auto", children: children }) }));
}
