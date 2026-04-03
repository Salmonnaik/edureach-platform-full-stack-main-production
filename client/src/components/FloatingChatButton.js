import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ChatDrawer from "./ChatDrawer";
export default function FloatingChatButton() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [chatOpen, setChatOpen] = useState(false);
    const handleClick = () => {
        if (user) {
            setChatOpen(!chatOpen);
        }
        else {
            navigate("/login");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(ChatDrawer, { open: chatOpen, onClose: () => setChatOpen(false) }), _jsx("button", { onClick: handleClick, className: `fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${chatOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-maroon hover:bg-maroon-dark"}`, title: user ? "Chat with EduReach Bot" : "Login to chat", children: chatOpen ? (_jsx(MessageCircle, { className: "w-6 h-6 text-white" })) : (_jsx(MessageCircle, { className: "w-6 h-6 text-white animate-bounce [animation-duration:2s] [animation-iteration-count:3]" })) })] }));
}
