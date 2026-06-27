import { useState } from "react";
import { useNavigate } from "react-router-dom";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", solved: true },
  { id: 2, title: "Reverse Linked List", difficulty: "Easy", category: "Linked List", solved: true },
  { id: 3, title: "Binary Search", difficulty: "Easy", category: "Search", solved: false },
  { id: 4, title: "Merge Intervals", difficulty: "Medium", category: "Arrays", solved: false },
  { id: 5, title: "LRU Cache", difficulty: "Hard", category: "Design", solved: false },
];



const diffColor = {
  Easy: "#4ade80",
  Medium: "#facc15",
  Hard: "#f87171",
};

export default function Home() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [userStats, setUserStats] = useState({
    problemsSolved: 0,
    streak: 0,
    rank: "-",
    accuracy: "0%",
  });

  const stats = [
    { label: "Problems Solved", value: userStats.problemsSolved, sub: "of 450 total" },
    { label: "Current Streak", value: userStats.streak, sub: "days" },
    { label: "Rank", value: userStats.rank, sub: "globally" },
    { label: "Accuracy", value: userStats.accuracy, sub: "success rate" },
  ];

  useEffect(() => {
    // get user from localStorage (set during login)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // fetch real stats from backend
    fetch("http://localhost:3000/api/user/stats", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserStats({
          problemsSolved: data.problemsSolved,
          streak: data.streak,
          rank: `#${data.rank}`,
          accuracy: `${data.accuracy}%`,
        });
      })
      .catch(() => { }); // silently fail — keeps default zeros
  }, []);

  const [user, setUser] = useState(null);


  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include", // sends cookie so backend can clear it
    });
    localStorage.removeItem("user");
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#0d0d0d", fontFamily: "'Courier New', monospace", color: "#e5e5e5" }}
    >
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="fixed top-[-120px] right-[-120px] w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #dc2626, transparent 70%)" }} />
      <div className="fixed bottom-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #991b1b, transparent 70%)" }} />

      {/* ── NAVBAR ── */}
      <nav
        className="relative z-20 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(220,38,38,0.2)", background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center"
            style={{ border: "1px solid rgba(220,38,38,0.6)", borderRadius: "2px", background: "rgba(220,38,38,0.1)" }}>
            <span style={{ color: "#dc2626", fontSize: "14px", fontWeight: 900 }}>⌬</span>
          </div>
          <span className="text-sm font-black uppercase tracking-widest" style={{ color: "#fff", letterSpacing: "0.25em" }}>
            CODE<span style={{ color: "#dc2626" }}>VAULT</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {["Dashboard", "Problems", "Leaderboard", "Discuss"].map((item) => (
            <button key={item}
              onClick={() => item === "Problems" && navigate("/problems")}
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: item === "Dashboard" ? "#dc2626" : "#666", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { if (item !== "Dashboard") e.target.style.color = "#aaa"; }}
              onMouseLeave={(e) => { if (item !== "Dashboard") e.target.style.color = "#666"; }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "rgba(220,38,38,0.2)", border: "1px solid rgba(220,38,38,0.4)", color: "#dc2626" }}>
            U
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:block text-xs uppercase tracking-widest px-4 py-2 transition-all duration-200"
            style={{ border: "1px solid rgba(220,38,38,0.4)", borderRadius: "2px", color: "#dc2626", background: "none", cursor: "pointer" }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(220,38,38,0.1)"; }}
            onMouseLeave={(e) => { e.target.style.background = "none"; }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="relative z-10 px-6 pt-12 pb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px" style={{ background: "rgba(220,38,38,0.6)" }} />
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: "#dc2626" }}>
            Welcome back, {user?.username || ""}
          </span>
        </div>
        <h1 className="text-5xl font-black uppercase mb-2"
          style={{ color: "#fff", textShadow: "0 0 40px rgba(220,38,38,0.3)", letterSpacing: "0.08em", lineHeight: 1.1 }}>
          YOUR <span style={{ color: "#dc2626" }}>DASHBOARD</span>
        </h1>
        <p className="text-sm mt-3" style={{ color: "#555", letterSpacing: "0.1em" }}>
          TRACK YOUR PROGRESS — CONQUER THE PROBLEMS
        </p>
      </div>

      {/* ── STATS ── */}
      <div className="relative z-10 px-6 pb-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label}
              className="px-5 py-5 transition-all duration-300"
              style={{
                background: "rgba(15,15,15,0.9)",
                border: "1px solid rgba(220,38,38,0.2)",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid rgba(220,38,38,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(220,38,38,0.2)")}
            >
              <div className="text-3xl font-black mb-1" style={{ color: "#dc2626" }}>{s.value}</div>
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#fff" }}>{s.label}</div>
              <div className="text-xs" style={{ color: "#555" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT PROBLEMS + ACTIVITY ── */}
      <div className="relative z-10 px-6 pb-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* Recent Problems — 2 cols */}
        <div className="md:col-span-2"
          style={{ background: "rgba(15,15,15,0.9)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "2px" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}>
            <div className="flex items-center gap-3">
              <div className="w-1 h-5" style={{ background: "#dc2626", borderRadius: "1px" }} />
              <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#fff", letterSpacing: "0.2em" }}>
                Recent Problems
              </span>
            </div>
            <button
              onClick={() => navigate("/problems")}
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.target.style.color = "#f87171")}
              onMouseLeave={(e) => (e.target.style.color = "#dc2626")}
            >
              View All →
            </button>
          </div>
          {/* Rows */}
          {problems.map((p, i) => (
            <div key={p.id}
              className="flex items-center justify-between px-6 py-4 transition-all duration-200 cursor-pointer"
              style={{ borderBottom: i < problems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(220,38,38,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              onClick={() => navigate("/problems")}
            >
              <div className="flex items-center gap-4">
                <span className="text-xs w-6 text-right" style={{ color: "#444" }}>#{p.id}</span>
                <div>
                  <div className="text-sm font-bold" style={{ color: p.solved ? "#888" : "#e5e5e5" }}>{p.title}</div>
                  <div className="text-xs mt-0.5 uppercase tracking-widest" style={{ color: "#444" }}>{p.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: diffColor[p.difficulty] }}>
                  {p.difficulty}
                </span>
                <div className="w-5 h-5 flex items-center justify-center rounded-full"
                  style={{
                    background: p.solved ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${p.solved ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}`,
                  }}>
                  {p.solved && <span style={{ color: "#4ade80", fontSize: "10px" }}>✓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity sidebar — 1 col */}
        <div className="flex flex-col gap-4">
          {/* Progress */}
          <div style={{ background: "rgba(15,15,15,0.9)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "2px" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}>
              <div className="flex items-center gap-3">
                <div className="w-1 h-5" style={{ background: "#dc2626", borderRadius: "1px" }} />
                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#fff", letterSpacing: "0.2em" }}>Progress</span>
              </div>
            </div>
            <div className="px-5 py-5">
              {[{ label: "Easy", done: 68, total: 150, color: "#4ade80" },
              { label: "Medium", done: 45, total: 200, color: "#facc15" },
              { label: "Hard", done: 15, total: 100, color: "#f87171" }].map((bar) => (
                <div key={bar.label} className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs uppercase tracking-widest" style={{ color: bar.color }}>{bar.label}</span>
                    <span className="text-xs" style={{ color: "#555" }}>{bar.done}/{bar.total}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${(bar.done / bar.total) * 100}%`, background: bar.color, boxShadow: `0 0 8px ${bar.color}60` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ background: "rgba(15,15,15,0.9)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "2px" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}>
              <div className="flex items-center gap-3">
                <div className="w-1 h-5" style={{ background: "#dc2626", borderRadius: "1px" }} />
                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#fff", letterSpacing: "0.2em" }}>Quick Access</span>
              </div>
            </div>
            <div className="px-5 py-4 flex flex-col gap-2">
              {[
                { label: "→ Daily Challenge", action: () => navigate("/problems") },
                { label: "→ Random Problem", action: () => navigate("/problems") },
                { label: "→ My Submissions", action: () => { } },
                { label: "→ Bookmarks", action: () => { } },
              ].map((item) => (
                <button key={item.label}
                  onClick={item.action}
                  className="w-full text-left px-3 py-2.5 text-xs uppercase tracking-widest transition-all duration-200"
                  style={{ color: "#666", background: "none", border: "1px solid transparent", borderRadius: "2px", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.target.style.color = "#dc2626"; e.target.style.borderColor = "rgba(220,38,38,0.3)"; e.target.style.background = "rgba(220,38,38,0.05)"; }}
                  onMouseLeave={(e) => { e.target.style.color = "#666"; e.target.style.borderColor = "transparent"; e.target.style.background = "none"; }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="fixed bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)" }} />
    </div>
  );
}
