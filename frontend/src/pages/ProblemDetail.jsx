import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const diffColor = { Easy: "#4ade80", Medium: "#facc15", Hard: "#f87171" };
const diffBg = { Easy: "rgba(74,222,128,0.08)", Medium: "rgba(250,204,21,0.08)", Hard: "rgba(248,113,113,0.08)" };
const diffBorder = { Easy: "rgba(74,222,128,0.25)", Medium: "rgba(250,204,21,0.25)", Hard: "rgba(248,113,113,0.25)" };

const languages = ["javascript", "python", "cpp", "java"];

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState();
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // description | submissions
  const [activeConsoleTab, setActiveConsoleTab] = useState("testcases"); // testcases | custom | output
  const [customInput, setCustomInput] = useState("");
  const [isCustom, setIsCustom] = useState(false); // tracks if run was triggered with custom input

  //── Fetch real problem from backend ──
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/problems/${id}`,
      { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setProblem(data.problem);
        setCode(data.problem.starterCode[language] || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Update code when language changes
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || "");
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    setActiveConsoleTab("output"); // auto switch to output tab when running

    try {
      const res = await fetch("http://localhost:3000/api/compiler/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          language: language,
          code: code,
          problemId: id,
          customInput: isCustom ? customInput : null, // send custom input only if toggled
          useCustomInput: isCustom,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setOutput(`Error: ${data.message || "Something went wrong."}`);
      } else {
        setOutput(data.output);
      }
    } catch (err) {
      setOutput("Server error. Could not run code.");
    } finally {
      setRunning(false);
    }
  };

  // ── Submit code (placeholder — wire to compiler + grading later) ──
  const handleSubmit = async () => {
    setRunning(true);
    setOutput("");

    try {
      const res = await fetch("http://localhost:3000/api/compiler/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          language: language,   // selected language
          code: code,           // code from textarea
          problemId: id,        // problem id from useParams
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setOutput(`Error: ${data.message || "Something went wrong."}`);
      } else {
        setOutput(data.output); // backend sends verdict + runtime + memory
      }
    } catch (err) {
      setOutput("Server error. Could not submit code.");
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "#0d0d0d", fontFamily: "'Courier New', monospace" }}>
        <span style={{ color: "#dc2626", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Loading problem...
        </span>
      </div>
    );
  }

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

        <button
          onClick={() => navigate("/problems")}
          className="text-xs uppercase tracking-widest transition-colors duration-200"
          style={{ color: "#666", background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.target.style.color = "#dc2626")}
          onMouseLeave={(e) => (e.target.style.color = "#666")}
        >
          ← Back to Problems
        </button>
      </nav>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-0" style={{ minHeight: "calc(100vh - 65px)" }}>

        {/* ───────── LEFT PANEL — Problem description ───────── */}
        <div className="p-6 lg:p-8 overflow-y-auto" style={{ borderRight: "1px solid rgba(220,38,38,0.15)" }}>

          {/* Title + meta */}
          <div className="mb-5">
            <h1 className="text-2xl font-black uppercase mb-3"
              style={{ color: "#fff", letterSpacing: "0.05em" }}>
              {problem.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs uppercase tracking-widest px-2.5 py-1 font-bold"
                style={{
                  color: diffColor[problem.difficulty],
                  background: diffBg[problem.difficulty],
                  border: `1px solid ${diffBorder[problem.difficulty]}`,
                  borderRadius: "2px",
                }}>
                {problem.difficulty}
              </span>
              <span className="text-xs uppercase tracking-widest" style={{ color: "#555" }}>{problem.category}</span>
              {problem.tags?.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", color: "#666" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-6" style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}>
            {["description", "submissions"].map((tab) => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-3 text-xs uppercase tracking-widest font-bold transition-colors duration-200"
                style={{
                  color: activeTab === tab ? "#dc2626" : "#555",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid #dc2626" : "2px solid transparent",
                  cursor: "pointer",
                  letterSpacing: "0.2em",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "description" ? (
            <>
              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#ccc" }}>
                {problem.description}
              </p>

              {/* Examples */}
              {problem.examples?.map((ex, i) => (
                <div key={i} className="mb-5">
                  <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#dc2626" }}>
                    Example {i + 1}
                  </div>
                  <div className="p-4 text-xs leading-relaxed"
                    style={{ background: "rgba(15,15,15,0.9)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: "2px" }}>
                    <div className="mb-1"><span style={{ color: "#666" }}>Input: </span><span style={{ color: "#e5e5e5" }}>{ex.input}</span></div>
                    <div className="mb-1"><span style={{ color: "#666" }}>Output: </span><span style={{ color: "#e5e5e5" }}>{ex.output}</span></div>
                    {ex.explanation && (
                      <div><span style={{ color: "#666" }}>Explanation: </span><span style={{ color: "#999" }}>{ex.explanation}</span></div>
                    )}
                  </div>
                </div>
              ))}

              {/* Constraints */}
              {problem.constraints?.length > 0 && (
                <div className="mb-5">
                  <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: "#dc2626" }}>
                    Constraints
                  </div>
                  <ul className="text-xs leading-relaxed pl-5" style={{ color: "#999", listStyle: "disc" }}>
                    {problem.constraints.map((c, i) => (
                      <li key={i} className="mb-1" style={{ fontFamily: "'Courier New', monospace" }}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            // Submissions tab placeholder
            <div className="text-center py-16">
              <div className="text-4xl mb-4" style={{ color: "rgba(220,38,38,0.3)" }}>◈</div>
              <p className="text-xs uppercase tracking-widest" style={{ color: "#444" }}>No submissions yet</p>
            </div>
          )}
        </div>

        {/* ───────── RIGHT PANEL — Code editor ───────── */}
        <div className="flex flex-col" style={{ background: "rgba(8,8,8,0.95)" }}>

          {/* Editor toolbar */}
          <div className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: "1px solid rgba(220,38,38,0.15)" }}>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className="px-3 py-1.5 text-xs uppercase tracking-widest transition-all duration-200"
                  style={{
                    border: language === lang ? "1px solid rgba(220,38,38,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "2px",
                    background: language === lang ? "rgba(220,38,38,0.1)" : "transparent",
                    color: language === lang ? "#dc2626" : "#555",
                    cursor: "pointer",
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCode(problem.starterCode[language] || "")}
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "#555", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.target.style.color = "#dc2626")}
              onMouseLeave={(e) => (e.target.style.color = "#555")}
            >
              Reset
            </button>
          </div>

          {/* Code editor textarea */}
          {/* TEMP — replace with Monaco Editor / CodeMirror for real syntax highlighting */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full p-5 text-sm outline-none resize-none"
            style={{
              background: "transparent",
              color: "#e5e5e5",
              fontFamily: "'Courier New', monospace",
              lineHeight: "1.6",
              border: "none",
              minHeight: "320px",
              caretColor: "#dc2626",
            }}
          />

          {/* Run / Submit buttons */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ borderTop: "1px solid rgba(220,38,38,0.15)" }}>
            <button
              onClick={handleRun}
              disabled={running}
              className="px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "2px",
                background: "transparent",
                color: "#e5e5e5",
                cursor: running ? "not-allowed" : "pointer",
                opacity: running ? 0.5 : 1,
                letterSpacing: "0.2em",
              }}
              onMouseEnter={(e) => { if (!running) e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={(e) => { if (!running) e.target.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              {running ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={running}
              className="px-5 py-2.5 text-xs uppercase tracking-widest font-bold transition-all duration-200"
              style={{
                background: running ? "rgba(220,38,38,0.5)" : "linear-gradient(135deg, #dc2626, #991b1b)",
                color: "#fff",
                border: "none",
                borderRadius: "2px",
                cursor: running ? "not-allowed" : "pointer",
                letterSpacing: "0.2em",
                boxShadow: running ? "none" : "0 4px 24px rgba(220,38,38,0.35)",
              }}
            >
              {running ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Console — tabs + content */}
          <div style={{ borderTop: "1px solid rgba(220,38,38,0.15)", minHeight: "180px", maxHeight: "260px", display: "flex", flexDirection: "column" }}>

            {/* Console tab bar */}
            <div className="flex items-center justify-between px-5"
              style={{ borderBottom: "1px solid rgba(220,38,38,0.1)", background: "rgba(5,5,5,0.6)" }}>
              <div className="flex">
                {[
                  { key: "testcases", label: "Test Cases" },
                  { key: "custom", label: "Custom Input" },
                  { key: "output", label: "Output" },
                ].map((tab) => (
                  <button key={tab.key}
                    onClick={() => setActiveConsoleTab(tab.key)}
                    className="py-2.5 px-4 text-xs uppercase tracking-widest transition-colors duration-200"
                    style={{
                      color: activeConsoleTab === tab.key ? "#dc2626" : "#555",
                      background: "none",
                      border: "none",
                      borderBottom: activeConsoleTab === tab.key ? "2px solid #dc2626" : "2px solid transparent",
                      cursor: "pointer",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Custom input toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest" style={{ color: "#555" }}>Custom</span>
                <div
                  onClick={() => {
                    setIsCustom(!isCustom);
                    setActiveConsoleTab(!isCustom ? "custom" : "testcases");
                  }}
                  className="relative cursor-pointer transition-all duration-200"
                  style={{
                    width: "36px",
                    height: "20px",
                    background: isCustom ? "rgba(220,38,38,0.8)" : "rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    border: isCustom ? "1px solid rgba(220,38,38,0.9)" : "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "2px",
                    left: isCustom ? "18px" : "2px",
                    width: "14px",
                    height: "14px",
                    background: isCustom ? "#fff" : "#666",
                    borderRadius: "50%",
                    transition: "left 0.2s ease",
                  }} />
                </div>
              </div>
            </div>

            {/* Console content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">

              {/* Test Cases tab */}
              {activeConsoleTab === "testcases" && (
                <div>
                  {problem.testCases?.filter(tc => !tc.isHidden).length === 0 ? (
                    <p className="text-xs" style={{ color: "#444" }}>No visible test cases.</p>
                  ) : (
                    problem.testCases?.filter(tc => !tc.isHidden).map((tc, i) => (
                      <div key={i} className="mb-4">
                        <div className="text-xs uppercase tracking-widest font-bold mb-2"
                          style={{ color: "#dc2626" }}>
                          Case {i + 1}
                        </div>
                        <div className="mb-2">
                          <div className="text-xs mb-1 uppercase tracking-widest" style={{ color: "#555" }}>Input</div>
                          <pre className="text-xs px-3 py-2"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: "2px",
                              color: "#ccc",
                              fontFamily: "'Courier New', monospace",
                            }}>
                            {tc.input}
                          </pre>
                        </div>
                        <div>
                          <div className="text-xs mb-1 uppercase tracking-widest" style={{ color: "#555" }}>Expected Output</div>
                          <pre className="text-xs px-3 py-2"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: "2px",
                              color: "#ccc",
                              fontFamily: "'Courier New', monospace",
                            }}>
                            {tc.expectedOutput}
                          </pre>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Custom Input tab */}
              {activeConsoleTab === "custom" && (
                <div>
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "#555" }}>
                    Enter your custom input below, then click Run Code
                  </div>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={"e.g.\n[2,7,11,15]\n9"}
                    spellCheck={false}
                    className="w-full p-3 text-xs outline-none resize-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "2px",
                      color: "#e5e5e5",
                      fontFamily: "'Courier New', monospace",
                      height: "120px",
                      caretColor: "#dc2626",
                    }}
                    onFocus={(e) => (e.target.style.border = "1px solid rgba(220,38,38,0.5)")}
                    onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                  />
                  {!isCustom && (
                    <p className="text-xs mt-2" style={{ color: "#f87171" }}>
                      ⚠ Toggle Custom on to use this input when running
                    </p>
                  )}
                </div>
              )}

              {/* Output tab */}
              {activeConsoleTab === "output" && (
                <pre className="text-xs whitespace-pre-wrap"
                  style={{
                    color: output ? "#ccc" : "#444",
                    fontFamily: "'Courier New', monospace",
                    lineHeight: "1.6",
                  }}>
                  {output || "Run your code to see output here..."}
                </pre>
              )}
            </div>
          </div>

          {/* Bottom accent */}
          <div className="fixed bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)" }} />
        </div>
      </div>
    </div>
  );
}
