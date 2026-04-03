import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function Heading({ children, level, className = "", gradient = false, center = false }) {
    const baseClasses = `
    font-bold tracking-tight
    ${center ? 'text-center' : ''}
    ${className}
  `;
    const gradientClasses = gradient
        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
        : "text-gray-900";
    const sizes = {
        1: "text-4xl md:text-6xl lg:text-7xl",
        2: "text-3xl md:text-5xl lg:text-6xl",
        3: "text-2xl md:text-4xl lg:text-5xl",
        4: "text-xl md:text-3xl lg:text-4xl",
        5: "text-lg md:text-2xl lg:text-3xl",
        6: "text-base md:text-xl lg:text-2xl"
    };
    const combinedClasses = `${baseClasses} ${gradientClasses} ${sizes[level]}`;
    const renderHeading = () => {
        switch (level) {
            case 1:
                return _jsx("h1", { className: combinedClasses, children: children });
            case 2:
                return _jsx("h2", { className: combinedClasses, children: children });
            case 3:
                return _jsx("h3", { className: combinedClasses, children: children });
            case 4:
                return _jsx("h4", { className: combinedClasses, children: children });
            case 5:
                return _jsx("h5", { className: combinedClasses, children: children });
            case 6:
                return _jsx("h6", { className: combinedClasses, children: children });
            default:
                return _jsx("h2", { className: combinedClasses, children: children });
        }
    };
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut" }, viewport: { once: true }, children: renderHeading() }));
}
