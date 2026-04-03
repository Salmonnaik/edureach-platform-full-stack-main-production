import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Minus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { sendMessage } from "../services/chat.service";
const quickQuestions = [
    "What courses do you offer?",
    "Tell me about placements",
    "What is the fee structure?",
    "How to apply for admissions?",
];
export default function ChatDrawer({ open, onClose }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: `Hi ${user?.name?.split(" ")[0] || "there"}! 👋 I'm EduReach Bot. Ask me anything about courses, fees, admissions, or campus life.`,
            sender: "bot",
        },
    ]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const handleSend = async (text) => {
        const messageText = text || input.trim();
        if (!messageText || sending)
            return;
        const userMsg = { id: Date.now(), text: messageText, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setSending(true);
        try {
            // sendMessage now returns { message: "answer text" }
            const data = await sendMessage(messageText);
            const botMsg = { id: Date.now() + 1, text: data.message, sender: "bot" };
            setMessages((prev) => [...prev, botMsg]);
        }
        catch {
            const errorMsg = { id: Date.now() + 1, text: "Sorry, something went wrong. Please try again.", sender: "bot" };
            setMessages((prev) => [...prev, errorMsg]);
        }
        finally {
            setSending(false);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    if (!open)
        return null;
    return (_jsxs("div", { className: "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200", children: [_jsxs("div", { className: "bg-maroon px-4 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 bg-white/20 rounded-full flex items-center justify-center", children: _jsx(Bot, { className: "w-4 h-4 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold text-sm", children: "EduReach Bot" }), _jsx("p", { className: "text-white/70 text-xs", children: "Ask me anything" })] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: onClose, className: "text-white/70 hover:text-white p-1 transition-colors duration-200", children: _jsx(Minus, { className: "w-4 h-4" }) }), _jsx("button", { onClick: onClose, className: "text-white/70 hover:text-white p-1 transition-colors duration-200", children: _jsx(X, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50", children: [messages.map((msg) => (_jsxs("div", { className: `flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`, children: [msg.sender === "bot" && (_jsx("div", { className: "w-6 h-6 bg-maroon rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(Bot, { className: "w-3 h-3 text-white" }) })), _jsx("div", { className: `max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                    ? "bg-maroon text-white rounded-br-sm"
                                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"}`, children: msg.text }), msg.sender === "user" && (_jsx("div", { className: "w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(User, { className: "w-3 h-3 text-gray-600" }) }))] }, msg.id))), sending && (_jsxs("div", { className: "flex items-end gap-2", children: [_jsx("div", { className: "w-6 h-6 bg-maroon rounded-full flex items-center justify-center", children: _jsx(Bot, { className: "w-3 h-3 text-white" }) }), _jsx("div", { className: "bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm", children: _jsxs("div", { className: "flex gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" }), _jsx("span", { className: "w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" }), _jsx("span", { className: "w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" })] }) })] })), _jsx("div", { ref: messagesEndRef })] }), messages.length === 1 && (_jsxs("div", { className: "px-3 py-2 bg-gray-50 border-t border-gray-100", children: [_jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Quick questions:" }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: quickQuestions.map((q) => (_jsx("button", { onClick: () => handleSend(q), className: "text-xs px-2.5 py-1 bg-white border border-maroon/20 text-maroon rounded-full hover:bg-maroon hover:text-white transition-colors duration-200", children: q }, q))) })] })), _jsx("div", { className: "bg-white border-t border-gray-200 p-3", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: "Ask a question...", disabled: sending, className: "flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-maroon text-sm disabled:opacity-50 transition-colors duration-200" }), _jsx("button", { onClick: () => handleSend(), disabled: !input.trim() || sending, className: "w-9 h-9 bg-maroon text-white rounded-lg flex items-center justify-center hover:bg-maroon-dark disabled:opacity-50 transition-colors duration-200", children: _jsx(Send, { className: "w-4 h-4" }) })] }) })] }));
}
