import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = "Username is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Minimum 6 characters.";
    if (!form.confirmPassword) errs.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.newUser));
        setSuccessMsg(`Account created! Welcome, ${form.username}!`);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrors({ general: data.message || "Registration failed. Try again." });
      }
    } catch (err) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMsg("");
  };

  const inputStyle = (hasError) => ({
    background: "rgba(255,255,255,0.05)",
    border: hasError ? "1px solid #dc2626" : "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    color: "#e5e5e5",
    fontFamily: "'Courier New', monospace",
    caretColor: "#dc2626",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#0d0d0d", fontFamily: "'Courier New', monospace" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red glow blobs */}
      <div className="absolute top-[-120px] right-[-120px] w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #dc2626, transparent 70%)" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #991b1b, transparent 70%)" }} />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background: "rgba(15,15,15,0.92)",
          border: "1px solid rgba(220,38,38,0.3)",
          borderRadius: "2px",
          boxShadow: "0 0 60px rgba(220,38,38,0.12), 0 24px 64px rgba(0,0,0,0.7)",
        }}
      >
        {/* Top accent line */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />

        <div className="px-8 py-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-px" style={{ background: "rgba(220,38,38,0.6)" }} />
              <span className="text-xs tracking-[0.35em] uppercase" style={{ color: "#dc2626" }}>
                NEW IDENTITY
              </span>
              <div className="w-8 h-px" style={{ background: "rgba(220,38,38,0.6)" }} />
            </div>
            <h1
              className="text-4xl font-black uppercase tracking-widest"
              style={{ color: "#ffffff", textShadow: "0 0 30px rgba(220,38,38,0.4)", letterSpacing: "0.2em" }}
            >
              REGISTER
            </h1>
          </div>

          {/* Success message */}
          {successMsg && (
            <div className="mb-5 px-4 py-3 text-xs tracking-wider text-center"
              style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.4)", color: "#f87171", borderRadius: "2px" }}>
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-xs mb-2 uppercase tracking-widest" style={{ color: "#888", letterSpacing: "0.2em" }}>
                  User Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "#dc2626" }}>◈</span>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    autoComplete="username"
                    className="w-full pl-9 pr-4 py-3 text-sm outline-none"
                    style={inputStyle(errors.username)}
                    onFocus={(e) => (e.target.style.border = "1px solid rgba(220,38,38,0.7)")}
                    onBlur={(e) => (e.target.style.border = errors.username ? "1px solid #dc2626" : "1px solid rgba(255,255,255,0.1)")}
                  />
                </div>
                {errors.username && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs mb-2 uppercase tracking-widest" style={{ color: "#888", letterSpacing: "0.2em" }}>
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "#dc2626" }}>◈</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full pl-9 pr-4 py-3 text-sm outline-none"
                    style={inputStyle(errors.email)}
                    onFocus={(e) => (e.target.style.border = "1px solid rgba(220,38,38,0.7)")}
                    onBlur={(e) => (e.target.style.border = errors.email ? "1px solid #dc2626" : "1px solid rgba(255,255,255,0.1)")}
                  />
                </div>
                {errors.email && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs mb-2 uppercase tracking-widest" style={{ color: "#888", letterSpacing: "0.2em" }}>
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "#dc2626" }}>◈</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-9 pr-16 py-3 text-sm outline-none"
                    style={inputStyle(errors.password)}
                    onFocus={(e) => (e.target.style.border = "1px solid rgba(220,38,38,0.7)")}
                    onBlur={(e) => (e.target.style.border = errors.password ? "1px solid #dc2626" : "1px solid rgba(255,255,255,0.1)")}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: "#555", background: "none", border: "none", cursor: "pointer" }}>
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
                {errors.password && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs mb-2 uppercase tracking-widest" style={{ color: "#888", letterSpacing: "0.2em" }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "#dc2626" }}>◈</span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full pl-9 pr-16 py-3 text-sm outline-none"
                    style={inputStyle(errors.confirmPassword)}
                    onFocus={(e) => (e.target.style.border = "1px solid rgba(220,38,38,0.7)")}
                    onBlur={(e) => (e.target.style.border = errors.confirmPassword ? "1px solid #dc2626" : "1px solid rgba(255,255,255,0.1)")}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: "#555", background: "none", border: "none", cursor: "pointer" }}>
                    {showConfirm ? "HIDE" : "SHOW"}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{errors.confirmPassword}</p>}
              </div>

              {/* Submit */}
              {errors.general && (
                <p className="text-xs mb-3 text-center" style={{ color: "#f87171" }}>{errors.general}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-sm font-black uppercase tracking-widest"
                style={{
                  background: loading ? "rgba(220,38,38,0.5)" : "linear-gradient(135deg, #dc2626, #991b1b)",
                  color: "#fff", border: "none", borderRadius: "2px",
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.25em",
                  boxShadow: loading ? "none" : "0 4px 24px rgba(220,38,38,0.35)",
                }}
                onMouseEnter={(e) => { if (!loading) e.target.style.boxShadow = "0 6px 32px rgba(220,38,38,0.55)"; }}
                onMouseLeave={(e) => { if (!loading) e.target.style.boxShadow = "0 4px 24px rgba(220,38,38,0.35)"; }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Processing...
                  </span>
                ) : "Create Account"}
              </button>
            </div>
          </form>

          {/* Switch to Login */}
          <p className="text-center mt-6 text-xs" style={{ color: "#444" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
              onMouseEnter={(e) => (e.target.style.color = "#f87171")}
              onMouseLeave={(e) => (e.target.style.color = "#dc2626")}
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Bottom accent */}
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)" }} />
      </div>
    </div>
  );
}
