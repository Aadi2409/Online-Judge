import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const quotes = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
];

const stats = [
  { value: "450+",  label: "Problems" },
  { value: "12K+",  label: "Users" },
  { value: "4",     label: "Languages" },
  { value: "98%",   label: "Uptime" },
];

const features = [
  {
    icon: "⌬",
    title: "Multi-Language Support",
    desc: "Write and run code in JavaScript, Python, C++, and Java. Switch languages mid-session without losing your work.",
  },
  {
    icon: "◈",
    title: "Real Test Cases",
    desc: "Every problem ships with visible examples and hidden judge cases. Your solution is only accepted when all pass.",
  },
  {
    icon: "▸",
    title: "Instant Feedback",
    desc: "Know within seconds if your code passes, fails, times out, or crashes — with output diffs on every case.",
  },
  {
    icon: "≡",
    title: "Track Your Progress",
    desc: "Your personal dashboard tracks solved problems, streaks, accuracy, and rank against every other user.",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Rotate quotes every 4 seconds with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % quotes.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = quotes[quoteIndex];

  return (
    <div
      style={{
        background: "#0d0d0d",
        fontFamily: "'Courier New', monospace",
        color: "#e5e5e5",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── fixed grid background ── */}
      <div
        style={{
          position: "fixed", inset: 0, opacity: 0.08, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── red glow blobs ── */}
      <div style={{
        position: "fixed", top: -160, right: -160, width: 420, height: 420,
        borderRadius: "50%", opacity: 0.18, filter: "blur(80px)", pointerEvents: "none",
        background: "radial-gradient(circle, #dc2626, transparent 70%)",
      }} />
      <div style={{
        position: "fixed", bottom: -100, left: -100, width: 320, height: 320,
        borderRadius: "50%", opacity: 0.12, filter: "blur(60px)", pointerEvents: "none",
        background: "radial-gradient(circle, #991b1b, transparent 70%)",
      }} />

      {/* ════════════════════════════════
          NAVBAR
      ════════════════════════════════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 60,
        background: "rgba(8,8,8,0.88)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(220,38,38,0.18)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(220,38,38,0.6)", borderRadius: 2,
            background: "rgba(220,38,38,0.1)",
          }}>
            <span style={{ color: "#dc2626", fontSize: 14, fontWeight: 900 }}>⌬</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 14, letterSpacing: "0.25em", textTransform: "uppercase" }}>
            CODE<span style={{ color: "#dc2626" }}>VAULT</span>
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Problems", "Leaderboard"].map((item) => (
            <button key={item}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#666", fontSize: 11, letterSpacing: "0.2em",
                textTransform: "uppercase", fontFamily: "'Courier New', monospace",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#aaa")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "8px 20px", fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", fontFamily: "'Courier New', monospace",
              background: "transparent", color: "#dc2626", cursor: "pointer",
              border: "1px solid rgba(220,38,38,0.45)", borderRadius: 2,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(220,38,38,0.1)"; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "8px 20px", fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", fontFamily: "'Courier New', monospace",
              background: "linear-gradient(135deg, #dc2626, #991b1b)",
              color: "#fff", cursor: "pointer", border: "none", borderRadius: 2,
              boxShadow: "0 4px 20px rgba(220,38,38,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.boxShadow = "0 6px 28px rgba(220,38,38,0.5)"; }}
            onMouseLeave={(e) => { e.target.style.boxShadow = "0 4px 20px rgba(220,38,38,0.3)"; }}
          >
            Register
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 10,
        maxWidth: 960, margin: "0 auto",
        padding: "100px 32px 80px",
        textAlign: "center",
      }}>
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 1, background: "rgba(220,38,38,0.5)" }} />
          <span style={{ color: "#dc2626", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>
            Online Judge Platform
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(220,38,38,0.5)" }} />
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(40px, 8vw, 80px)",
          fontWeight: 900, textTransform: "uppercase",
          lineHeight: 1.05, letterSpacing: "0.06em",
          color: "#fff", margin: "0 0 24px",
          textShadow: "0 0 60px rgba(220,38,38,0.25)",
        }}>
          SHARPEN YOUR<br />
          <span style={{ color: "#dc2626" }}>PROBLEM SOLVING</span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 14, color: "#666", letterSpacing: "0.12em",
          textTransform: "uppercase", marginBottom: 48,
        }}>
          Write code. Run it. Beat the judge. Climb the ranks.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 72 }}>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "14px 36px", fontSize: 12, letterSpacing: "0.25em",
              textTransform: "uppercase", fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              background: "linear-gradient(135deg, #dc2626, #991b1b)",
              color: "#fff", border: "none", borderRadius: 2, cursor: "pointer",
              boxShadow: "0 6px 32px rgba(220,38,38,0.4)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.boxShadow = "0 8px 40px rgba(220,38,38,0.6)"; }}
            onMouseLeave={(e) => { e.target.style.boxShadow = "0 6px 32px rgba(220,38,38,0.4)"; }}
          >
            Start Solving →
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "14px 36px", fontSize: 12, letterSpacing: "0.25em",
              textTransform: "uppercase", fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              background: "transparent", color: "#e5e5e5", cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.35)"; e.target.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#e5e5e5"; }}
          >
            Sign In
          </button>
        </div>

        {/* ── ROTATING QUOTE ── */}
        <div style={{
          maxWidth: 600, margin: "0 auto",
          padding: "28px 32px",
          background: "rgba(15,15,15,0.9)",
          border: "1px solid rgba(220,38,38,0.2)",
          borderRadius: 2,
          borderLeft: "3px solid #dc2626",
          transition: "opacity 0.4s ease",
          opacity: visible ? 1 : 0,
        }}>
          <p style={{
            fontSize: 14, color: "#ccc", lineHeight: 1.7,
            fontStyle: "italic", margin: "0 0 10px",
            letterSpacing: "0.03em",
          }}>
            "{current.text}"
          </p>
          <span style={{
            fontSize: 11, color: "#dc2626", letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            — {current.author}
          </span>

          {/* Quote dots */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16 }}>
            {quotes.map((_, i) => (
              <div key={i} style={{
                width: i === quoteIndex ? 20 : 6,
                height: 4, borderRadius: 2,
                background: i === quoteIndex ? "#dc2626" : "rgba(255,255,255,0.1)",
                transition: "all 0.4s ease",
                cursor: "pointer",
              }}
                onClick={() => { setQuoteIndex(i); setVisible(true); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          STATS BAR
      ════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(220,38,38,0.12)",
        borderBottom: "1px solid rgba(220,38,38,0.12)",
        background: "rgba(12,12,12,0.8)",
        padding: "32px 32px",
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: "center", padding: "8px 0",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{
                fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900,
                color: "#dc2626", letterSpacing: "0.05em", lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 11, color: "#555", letterSpacing: "0.2em",
                textTransform: "uppercase", marginTop: 6,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURES
      ════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 10,
        maxWidth: 960, margin: "0 auto",
        padding: "80px 32px",
      }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 32, height: 1, background: "rgba(220,38,38,0.5)" }} />
            <span style={{ color: "#dc2626", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>
              What you get
            </span>
            <div style={{ width: 32, height: 1, background: "rgba(220,38,38,0.5)" }} />
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900,
            textTransform: "uppercase", color: "#fff",
            letterSpacing: "0.08em", margin: 0,
          }}>
            BUILT FOR <span style={{ color: "#dc2626" }}>SERIOUS CODERS</span>
          </h2>
        </div>

        {/* Feature grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}>
          {features.map((f) => (
            <div key={f.title}
              style={{
                padding: "28px 24px",
                background: "rgba(15,15,15,0.9)",
                border: "1px solid rgba(220,38,38,0.15)",
                borderRadius: 2,
                transition: "border-color 0.25s, transform 0.25s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(220,38,38,0.45)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(220,38,38,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: 2, marginBottom: 16, color: "#dc2626", fontSize: 16,
              }}>
                {f.icon}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: "#fff",
                letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10,
              }}>
                {f.title}
              </div>
              <p style={{
                fontSize: 12, color: "#666", lineHeight: 1.7, margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          PROBLEM PREVIEW (fake terminal)
      ════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(220,38,38,0.1)",
        background: "rgba(8,8,8,0.6)",
        padding: "80px 32px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>

          {/* Left — text */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: "rgba(220,38,38,0.5)" }} />
              <span style={{ color: "#dc2626", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase" }}>
                How it works
              </span>
            </div>
            <h2 style={{
              fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 900,
              textTransform: "uppercase", color: "#fff",
              letterSpacing: "0.06em", margin: "0 0 20px", lineHeight: 1.2,
            }}>
              READ. CODE.<br />
              <span style={{ color: "#dc2626" }}>CONQUER.</span>
            </h2>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.8, margin: "0 0 28px" }}>
              Pick a problem, read the description, write your solution in any supported language, and hit Submit. The judge runs your code against every test case — visible and hidden — and tells you exactly what passed and what didn't.
            </p>
            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "12px 28px", fontSize: 11, letterSpacing: "0.2em",
                textTransform: "uppercase", fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                background: "linear-gradient(135deg, #dc2626, #991b1b)",
                color: "#fff", border: "none", borderRadius: 2, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(220,38,38,0.3)",
              }}
            >
              Create Free Account →
            </button>
          </div>

          {/* Right — fake terminal */}
          <div style={{
            background: "rgba(5,5,5,0.95)",
            border: "1px solid rgba(220,38,38,0.2)",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}>
            {/* Terminal titlebar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
              borderBottom: "1px solid rgba(220,38,38,0.15)",
              background: "rgba(15,15,15,0.9)",
            }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f87171", opacity: 0.7 }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#facc15", opacity: 0.7 }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80", opacity: 0.7 }} />
              <span style={{ marginLeft: 8, fontSize: 10, color: "#555", letterSpacing: "0.15em" }}>code.cpp</span>
            </div>
            {/* Code */}
            <pre style={{
              margin: 0, padding: "20px 20px",
              fontSize: 12, lineHeight: 1.7,
              fontFamily: "'Courier New', monospace",
              color: "#ccc", overflowX: "auto",
            }}>
{`#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    `}<span style={{ color: "#4ade80" }}>cout</span>{` << a + b << endl;
    return `}<span style={{ color: "#dc2626" }}>0</span>{`;
}`}
            </pre>
            {/* Output */}
            <div style={{
              borderTop: "1px solid rgba(220,38,38,0.15)",
              padding: "12px 20px",
              background: "rgba(0,0,0,0.4)",
            }}>
              <div style={{ fontSize: 10, color: "#dc2626", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
                Output
              </div>
              <div style={{ fontSize: 12, color: "#4ade80", fontFamily: "'Courier New', monospace" }}>
                ✓ Case 1: Passed &nbsp; ✓ Case 2: Passed
              </div>
              <div style={{ fontSize: 12, color: "#4ade80", fontFamily: "'Courier New', monospace", marginTop: 2 }}>
                ✓ Accepted — all test cases passed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CTA BANNER
      ════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 10,
        padding: "80px 32px",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: 600, margin: "0 auto",
          padding: "52px 40px",
          background: "rgba(15,15,15,0.9)",
          border: "1px solid rgba(220,38,38,0.25)",
          borderRadius: 2,
          boxShadow: "0 0 80px rgba(220,38,38,0.08)",
        }}>
          <h2 style={{
            fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900,
            textTransform: "uppercase", color: "#fff",
            letterSpacing: "0.1em", margin: "0 0 14px",
          }}>
            READY TO <span style={{ color: "#dc2626" }}>COMPETE?</span>
          </h2>
          <p style={{ fontSize: 13, color: "#666", margin: "0 0 32px", lineHeight: 1.7 }}>
            Join thousands of developers who practice daily, track their progress, and push their limits on CodeVault.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "13px 32px", fontSize: 12, letterSpacing: "0.25em",
                textTransform: "uppercase", fontFamily: "'Courier New', monospace", fontWeight: 700,
                background: "linear-gradient(135deg, #dc2626, #991b1b)",
                color: "#fff", border: "none", borderRadius: 2, cursor: "pointer",
                boxShadow: "0 4px 24px rgba(220,38,38,0.4)",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.boxShadow = "0 6px 32px rgba(220,38,38,0.6)"; }}
              onMouseLeave={(e) => { e.target.style.boxShadow = "0 4px 24px rgba(220,38,38,0.4)"; }}
            >
              Create Account — It's Free
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "13px 32px", fontSize: 12, letterSpacing: "0.25em",
                textTransform: "uppercase", fontFamily: "'Courier New', monospace", fontWeight: 700,
                background: "transparent", color: "#888",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2, cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.color = "#fff"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={(e) => { e.target.style.color = "#888"; e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              Already have an account?
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FOOTER
      ════════════════════════════════ */}
      <footer style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(220,38,38,0.12)",
        padding: "24px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ color: "#fff", fontWeight: 900, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          CODE<span style={{ color: "#dc2626" }}>VAULT</span>
        </span>
        <span style={{ fontSize: 11, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          © 2026 CodeVault — All rights reserved
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Contact"].map((item) => (
            <button key={item} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#444", fontSize: 11, letterSpacing: "0.15em",
              textTransform: "uppercase", fontFamily: "'Courier New', monospace",
              transition: "color 0.2s",
            }}
              onMouseEnter={(e) => (e.target.style.color = "#dc2626")}
              onMouseLeave={(e) => (e.target.style.color = "#444")}
            >
              {item}
            </button>
          ))}
        </div>
      </footer>

      {/* bottom accent line */}
      <div style={{
        height: 1, width: "100%",
        background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.4), transparent)",
      }} />
    </div>
  );
}
