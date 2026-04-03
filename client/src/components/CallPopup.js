import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { initiateCall } from "../services/vapi.service";
import { vapiFormContent } from "../data/content";
export default function CallPopup({ open, onClose }) {
    const { user } = useAuth();
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState("");
    const [status, setStatus] = useState("form");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone || !course || !topic) {
            toast.error("Please fill in all fields");
            return;
        }
        setStatus("calling");
        try {
            await initiateCall({ phone, course, topic });
            setStatus("done");
            toast.success("Call initiated!");
        }
        catch {
            setStatus("error");
            toast.error("Failed to initiate call.");
        }
    };
    const reset = () => {
        setStatus("form");
        setPhone("");
        setCourse("");
        setTopic("");
    };
    const handleClose = () => {
        reset();
        onClose();
    };
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative", children: [_jsx("button", { onClick: handleClose, className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "bg-maroon rounded-t-2xl px-6 py-5", children: [_jsx("h3", { className: "font-heading text-xl font-bold text-white", children: "Talk to Our AI Counselor" }), _jsx("p", { className: "text-white/70 text-sm mt-1", children: "Get personalized guidance on courses, admissions & more" })] }), _jsxs("div", { className: "p-6", children: [status === "form" && (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Your Name" }), _jsx("input", { type: "text", value: user?.name || "", readOnly: true, className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone Number *" }), _jsxs("div", { className: "relative", children: [_jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+91-9876543210", className: "w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-sm transition-colors duration-200" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Interested Course *" }), _jsxs("select", { value: course, onChange: (e) => setCourse(e.target.value), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-sm transition-colors duration-200", children: [_jsx("option", { value: "", children: "Select a course" }), vapiFormContent.courses.map((c) => _jsx("option", { value: c, children: c }, c))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "What do you want to know? *" }), _jsxs("select", { value: topic, onChange: (e) => setTopic(e.target.value), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-sm transition-colors duration-200", children: [_jsx("option", { value: "", children: "Select a topic" }), vapiFormContent.topics.map((t) => _jsx("option", { value: t, children: t }, t))] })] }), _jsx("button", { type: "submit", className: "w-full bg-maroon text-white py-3 rounded-lg font-semibold hover:bg-maroon-dark transition-colors duration-200", children: "\uD83D\uDCDE Call Me Now" })] })), status === "calling" && (_jsxs("div", { className: "text-center py-10", children: [_jsx(Loader2, { className: "w-10 h-10 text-maroon mx-auto animate-spin mb-3" }), _jsx("h3", { className: "font-heading text-lg font-bold text-gray-900 mb-1", children: "Calling you now..." }), _jsxs("p", { className: "text-gray-500 text-sm", children: ["Our AI counselor Ava is dialing ", phone] })] })), status === "done" && (_jsxs("div", { className: "text-center py-10", children: [_jsx(CheckCircle, { className: "w-10 h-10 text-green-500 mx-auto mb-3" }), _jsx("h3", { className: "font-heading text-lg font-bold text-gray-900 mb-1", children: "Call Initiated!" }), _jsxs("p", { className: "text-gray-500 text-sm mb-4", children: ["You'll receive a call shortly on ", phone, "."] }), _jsx("button", { onClick: reset, className: "text-maroon font-medium text-sm hover:underline", children: "Request Another Call" })] })), status === "error" && (_jsxs("div", { className: "text-center py-10", children: [_jsx(AlertCircle, { className: "w-10 h-10 text-red-500 mx-auto mb-3" }), _jsx("h3", { className: "font-heading text-lg font-bold text-gray-900 mb-1", children: "Call Failed" }), _jsx("p", { className: "text-gray-500 text-sm mb-4", children: "Something went wrong. Please try again." }), _jsx("button", { onClick: reset, className: "bg-maroon text-white px-5 py-2 rounded-lg text-sm hover:bg-maroon-dark transition-colors duration-200", children: "Try Again" })] }))] })] }) }));
}
