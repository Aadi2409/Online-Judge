import { useState } from "react";
import { useNavigate } from "react-router-dom";

const allProblems = [
  { id: 1,  title: "Two Sum",                     difficulty: "Easy",   category: "Arrays",        solved: true,  acceptance: "48%" },
  { id: 2,  title: "Reverse Linked List",          difficulty: "Easy",   category: "Linked List",   solved: true,  acceptance: "71%" },
  { id: 3,  title: "Valid Parentheses",            difficulty: "Easy",   category: "Stack",         solved: true,  acceptance: "40%" },
  { id: 4,  title: "Binary Search",               difficulty: "Easy",   category: "Search",        solved: false, acceptance: "55%" },
  { id: 5,  title: "Merge Intervals",             difficulty: "Medium", category: "Arrays",        solved: false, acceptance: "45%" },
  { id: 6,  title: "3Sum",                        difficulty: "Medium", category: "Arrays",        solved: true,  acceptance: "32%" },
  { id: 7,  title: "Longest Substring",           difficulty: "Medium", category: "Sliding Window",solved: false, acceptance: "33%" },
  { id: 8,  title: "Word Break",                  difficulty: "Medium", category: "DP",            solved: false, acceptance: "44%" },
  { id: 9,  title: "LRU Cache",                   difficulty: "Hard",   category: "Design",        solved: false, acceptance: "39%" },
  { id: 10, title: "Trapping Rain Water",         difficulty: "Hard",   category: "Arrays",        solved: false, acceptance: "57%" },
  { id: 11, title: "Median of Two Sorted Arrays", difficulty: "Hard",   category: "Binary Search", solved: false, acceptance: "36%" },
  { id: 12, title: "Climbing Stairs",             difficulty: "Easy",   category: "DP",            solved: true,  acceptance: "51%" },
  { id: 13, title: "House Robber",                difficulty: "Medium", category: "DP",            solved: false, acceptance: "47%" },
  { id: 14, title: "Course Schedule",             difficulty: "Medium", category: "Graph",         solved: false, acceptance: "45%" },
  { id: 15, title: "Serialize Binary Tree",       difficulty: "Hard",   category: "Trees",         solved: false, acceptance: "54%" },
];

const diffColor  = { Easy: "#4ade80", Medium: "#facc15", Hard: "#f87171" };
const diffBg     = { Easy: "rgba(74,222,128,0.08)", Medium: "rgba(250,204,21,0.08)", Hard: "rgba(248,113,113,0.08)" };
const diffBorder = { Easy: "rgba(74,222,128,0.25)", Medium: "rgba(250,204,21,0.25)", Hard: "rgba(248,113,113,0.25)" };
const categories = ["All", ...Array.from(new Set(allProblems.map((p) => p.category)))];
export default function Problems() {
  const navigate = useNavigate();
  const [search, setSearch]         = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory]     = useState("All");
  const [status, setStatus]         = useState("All"); // All | Solved | Unsolved

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include", // sends cookie so backend can clear it
    });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filtered = allProblems.filter((p) => {
    const matchSearch     = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDifficulty = difficulty === "All" || p.difficulty === difficulty;
    const matchCategory   = category === "All"   || p.category === category;
    const matchStatus     =
      status === "All"     ? true :
      status === "Solved"  ? p.solved :
      !p.solved;
    return matchSearch && matchDifficulty && matchCategory && matchStatus;
  });

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
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center"
            style={{ border: "1px solid rgba(220,38,38,0.6)", borderRadius: "2px", background: "rgba(220,38,38,0.1)" }}>
            <span style={{ color: "#dc2626", fontSize: "14px", fontWeight: 900 }}>⌬</span>
          </div>
          <span className="text-sm font-black uppercase tracking-widest" style={{ color: "#fff", letterSpacing: "0.25em" }}>
            CODE<span style={{ color: "#dc2626" }}>VAULT</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {["Dashboard", "Problems", "Leaderboard", "Discuss"].map((item) => (
            <button key={item}
              onClick={() => item === "Dashboard" && navigate("/")}
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: item === "Problems" ? "#dc2626" : "#666", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { if (item !== "Problems") e.target.style.color = "#aaa"; }}
              onMouseLeave={(e) => { if (item !== "Problems") e.target.style.color = "#666"; }}
            >
              {item}
            </button>
          ))}
        </div>

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

      {/* ── PAGE HEADER ── */}
      <div className="relative z-10 px-6 pt-12 pb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px" style={{ background: "rgba(220,38,38,0.6)" }} />
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: "#dc2626" }}>Problem Set</span>
        </div>
        <h1 className="text-5xl font-black uppercase mb-2"
          style={{ color: "#fff", textShadow: "0 0 40px rgba(220,38,38,0.3)", letterSpacing: "0.08em", lineHeight: 1.1 }}>
          ALL <span style={{ color: "#dc2626" }}>PROBLEMS</span>
        </h1>
        <p className="text-sm mt-3" style={{ color: "#555", letterSpacing: "0.1em" }}>
          {filtered.length} PROBLEM{filtered.length !== 1 ? "S" : ""} FOUND
        </p>
      </div>

      {/* ── FILTERS ── */}
      <div className="relative z-10 px-6 pb-6 max-w-6xl mx-auto">
        <div
          className="flex flex-wrap gap-4 items-center p-5"
          style={{ background: "rgba(15,15,15,0.9)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "2px" }}
        >
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#dc2626" }}>◈</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems..."
              className="w-full pl-8 pr-4 py-2.5 text-xs outline-none"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "2px",
                color: "#e5e5e5",
                fontFamily: "'Courier New', monospace",
                caretColor: "#dc2626",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid rgba(220,38,38,0.5)")}
              onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
            />
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-2">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button key={d}
                onClick={() => setDifficulty(d)}
                className="px-3 py-2 text-xs uppercase tracking-widest transition-all duration-200"
                style={{
                  border: difficulty === d
                    ? `1px solid ${d === "All" ? "#dc2626" : diffColor[d] || "#dc2626"}`
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                  background: difficulty === d
                    ? (d === "All" ? "rgba(220,38,38,0.12)" : diffBg[d])
                    : "transparent",
                  color: difficulty === d
                    ? (d === "All" ? "#dc2626" : diffColor[d])
                    : "#555",
                  cursor: "pointer",
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex gap-2">
            {["All", "Solved", "Unsolved"].map((s) => (
              <button key={s}
                onClick={() => setStatus(s)}
                className="px-3 py-2 text-xs uppercase tracking-widest transition-all duration-200"
                style={{
                  border: status === s ? "1px solid rgba(220,38,38,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                  background: status === s ? "rgba(220,38,38,0.08)" : "transparent",
                  color: status === s ? "#dc2626" : "#555",
                  cursor: "pointer",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROBLEMS TABLE ── */}
      <div className="relative z-10 px-6 pb-16 max-w-6xl mx-auto">
        <div style={{ background: "rgba(15,15,15,0.9)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "2px" }}>

          {/* Table header */}
          <div className="grid px-6 py-3 text-xs uppercase tracking-widest"
            style={{
              gridTemplateColumns: "40px 1fr 140px 130px 80px 60px",
              borderBottom: "1px solid rgba(220,38,38,0.2)",
              color: "#dc2626",
              gap: "12px",
            }}>
            <span>#</span>
            <span>Title</span>
            <span>Category</span>
            <span>Difficulty</span>
            <span>Acceptance</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="text-4xl mb-4" style={{ color: "rgba(220,38,38,0.3)" }}>◈</div>
              <p className="text-xs uppercase tracking-widest" style={{ color: "#444" }}>No problems found</p>
            </div>
          ) : (
            filtered.map((p, i) => (
              <div key={p.id}
                className="grid px-6 py-4 items-center transition-all duration-200 cursor-pointer"
                style={{
                  gridTemplateColumns: "40px 1fr 140px 130px 80px 60px",
                  gap: "12px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(220,38,38,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* ID */}
                <span className="text-xs" style={{ color: "#444" }}>{p.id}</span>

                {/* Title */}
                <span className="text-sm font-bold truncate"
                  style={{ color: p.solved ? "#666" : "#e5e5e5" }}>
                  {p.title}
                </span>

                {/* Category */}
                <span className="text-xs uppercase tracking-widest" style={{ color: "#555" }}>{p.category}</span>

                {/* Difficulty badge */}
                <span>
                  <span className="text-xs uppercase tracking-widest px-2.5 py-1 font-bold"
                    style={{
                      color: diffColor[p.difficulty],
                      background: diffBg[p.difficulty],
                      border: `1px solid ${diffBorder[p.difficulty]}`,
                      borderRadius: "2px",
                    }}>
                    {p.difficulty}
                  </span>
                </span>

                {/* Acceptance */}
                <span className="text-xs" style={{ color: "#555" }}>{p.acceptance}</span>

                {/* Status */}
                <span>
                  <div className="w-5 h-5 flex items-center justify-center"
                    style={{
                      border: `1px solid ${p.solved ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "2px",
                      background: p.solved ? "rgba(74,222,128,0.08)" : "transparent",
                    }}>
                    {p.solved && <span style={{ color: "#4ade80", fontSize: "10px" }}>✓</span>}
                  </div>
                </span>
              </div>
            ))
          )}
        </div>

        {/* Pagination stub */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs uppercase tracking-widest" style={{ color: "#444" }}>
            Showing {filtered.length} of {allProblems.length} problems
          </span>
          <div className="flex gap-2">
            {[1, 2, 3].map((n) => (
              <button key={n}
                className="w-8 h-8 text-xs transition-all duration-200"
                style={{
                  border: n === 1 ? "1px solid rgba(220,38,38,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                  background: n === 1 ? "rgba(220,38,38,0.1)" : "transparent",
                  color: n === 1 ? "#dc2626" : "#555",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { if (n !== 1) { e.target.style.color = "#aaa"; e.target.style.borderColor = "rgba(255,255,255,0.2)"; } }}
                onMouseLeave={(e) => { if (n !== 1) { e.target.style.color = "#555"; e.target.style.borderColor = "rgba(255,255,255,0.08)"; } }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="fixed bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)" }} />
    </div>
  );
}
