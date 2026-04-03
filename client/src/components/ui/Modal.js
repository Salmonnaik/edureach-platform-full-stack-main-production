import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
export default function Modal({ isOpen, onClose, children, title, size = "md" }) {
    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl"
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "absolute inset-0 bg-black/50 backdrop-blur-sm", onClick: onClose }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: 20 }, transition: {
                        duration: 0.3,
                        ease: "easeOut"
                    }, className: `
              relative w-full ${sizes[size]} 
              bg-white/30 backdrop-blur-lg 
              border border-white/20 rounded-2xl 
              shadow-2xl shadow-purple-500/10
              overflow-hidden
            `, children: [title && (_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/20", children: [title && (_jsx("h3", { className: "text-xl font-semibold text-gray-900", children: title })), _jsx("button", { onClick: onClose, className: "p-2 rounded-lg hover:bg-white/50 transition-colors duration-200", children: _jsx(X, { className: "w-5 h-5 text-gray-600" }) })] })), !title && (_jsx("div", { className: "flex justify-end p-4", children: _jsx("button", { onClick: onClose, className: "p-2 rounded-lg hover:bg-white/50 transition-colors duration-200", children: _jsx(X, { className: "w-5 h-5 text-gray-600" }) }) })), _jsx("div", { className: "p-6", children: children })] })] })) }));
}
