// src/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const [status, setStatus] = useState("checking"); // 3 states: checking | ok | fail

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/verify", {
            credentials: "include", // sends the httpOnly cookie automatically
        })
            .then((res) => setStatus(res.ok ? "ok" : "fail"))
            .catch(() => setStatus("fail"));
    }, []);

    // show a loading screen while verifying
    if (status === "checking") {
        return (
            <div style={{
                background: "#0d0d0d",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <span style={{
                    color: "#dc2626",
                    fontFamily: "Courier New",
                    fontSize: "12px",
                    letterSpacing: "0.2em"
                }}>
                    VERIFYING...
                </span>
            </div>
        );
    }

    // if verified → show the page, if not → kick to login
    return status === "ok" ? children : <Navigate to="/login" />;
}