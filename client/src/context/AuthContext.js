import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../services/auth.service";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getMe()
                .then((data) => setUser(data.user))
                .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
                .finally(() => setLoading(false));
        }
        else {
            setLoading(false);
        }
    }, []);
    const login = (token) => {
        localStorage.setItem("token", token);
        getMe()
            .then((data) => setUser(data.user))
            .catch(() => {
            localStorage.removeItem("token");
            setUser(null);
        });
    };
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, login, logout }, children: children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
