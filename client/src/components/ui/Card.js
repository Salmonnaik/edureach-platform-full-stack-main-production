import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function Card({ children, className = "", hover = true, glass = false, onClick }) {
    const baseClasses = `
    rounded-2xl p-6 transition-all duration-300 ease-in-out
    ${glass
        ? 'bg-white/30 backdrop-blur-lg border border-white/20'
        : 'bg-white border border-gray-200'}
    ${hover ? 'hover:scale-105 hover:shadow-xl cursor-pointer' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;
    return (_jsx(motion.div, { whileHover: hover ? { y: -4 } : {}, transition: { duration: 0.3, ease: "easeInOut" }, className: baseClasses, onClick: onClick, children: children }));
}
