import { useState } from "react";

export default function ManagerLanding() {
  const [hoveredInsight, setHoveredInsight] = useState(null);

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      
      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(135deg, var(--paper) 0%, var(--cream) 100%)",
        padding: "60px 20px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ maxWidth: 1100, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="col-2">
          
          {/* LEFT: Content */}
          <div>
            <h1 className="syne" style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Real-time insights. Smarter queue management.
            </h1>
            <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 28 }}>
              Monitor queue performance across all organizations. Data-driven decisions made simple. Optimize staffing and improve citizen satisfaction.
            </p>
            <button className="btn btn-primary" style={{ fontSize: 15, padding: "14px 32px", marginBottom: 40 }}
              onClick={() => alert("Analytics coming soon!")}>
              sign up
            </button>
            
            
            {/* Key metrics */}
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { num: "58", label: "total waiting" },
                { num: "9", label: "served today" },
                { num: "11", label: "avg wait" }
              ].map(m => (
                <div key={m.label}>
                  <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: "var(--teal)" }}>{m.num}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Analytics mockup */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 320,
              background: "var(--card)",
              borderRadius: 16,
              border: "1px solid var(--border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden"
            }}>
              {/* Header */}
              <div style={{ background: "var(--teal)", color: "#fff", padding: "14px", fontSize: 13, fontWeight: 700 }}>
                Analytics
              </div>
              
              {/* Content */}
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Stats boxes */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { val: "58", lbl: "Waiting" },
                    { val: "9", lbl: "Served" },
                    { val: "4", lbl: "Orgs" },
                    { val: "11", lbl: "Avg Wait" }
                  ].map(s => (
                    <div key={s.lbl} style={{ background: "var(--cream)", borderRadius: 6, padding: 10, textAlign: "center" }}>
                      <div className="syne" style={{ fontSize: 16, fontWeight: 800, color: "var(--teal)" }}>{s.val}</div>
                      <div style={{ fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".07em", marginTop: 2 }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Queue load by org */}
                <div>
                  <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8, fontWeight: 600 }}>Queue Load</div>
                  {[
                    { name: "Ghana Health Service", pct: 75 },
                    { name: "DVLA Office", pct: 65 },
                    { name: "GRA", pct: 55 }
                  ].map(org => (
                    <div key={org.name} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 3 }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>{org.name.split(" ")[0]}</span>
                        <span style={{ color: "var(--muted)" }}>{org.pct}%</span>
                      </div>
                      <div style={{ height: 4, background: "var(--cream)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${org.pct}%`,
                          background: org.pct > 70 ? "linear-gradient(90deg, var(--rose), #ff8a65)" : "linear-gradient(90deg, var(--teal), var(--teal2))"
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Export button */}
                <button style={{ width: "100%", background: "var(--teal)", color: "#fff", border: "none", borderRadius: 6, padding: "8px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                  📊 Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MONITOR SECTION ─────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--card)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 50 }}>
            Monitor Everything That Matters
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="col-2">
            {[
              { icon: "📈", title: "Live Metrics", desc: "Real-time data on queue depth, service times, and performance." },
              { icon: "👥", title: "Multi-Organization", desc: "See metrics across all your agencies in one dashboard." },
              { icon: "🎯", title: "Actionable Insights", desc: "Identify bottlenecks. Optimize staffing. Improve satisfaction." }
            ].map(m => (
              <div
                key={m.title}
                className="card"
                style={{
                  padding: 28,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all .2s",
                  transform: hoveredInsight === m.title ? "translateY(-4px)" : "none",
                  boxShadow: hoveredInsight === m.title ? "0 8px 24px rgba(0,137,123,.15)" : "var(--shadow)"
                }}
                onMouseEnter={() => setHoveredInsight(m.title)}
                onMouseLeave={() => setHoveredInsight(null)}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{m.icon}</div>
                <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ───────────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 50 }}>
            Make Data-Driven Decisions
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="col-2">
            {[
              { title: "Optimize Staffing", desc: "See peak hours. Adjust officer schedules. Reduce wait times." },
              { title: "Track Performance", desc: "Monitor which services are slowest. Where should you invest?" },
              { title: "Improve Citizens", desc: "Reduce wait times. Build trust. Improve satisfaction ratings." }
            ].map(u => (
              <div key={u.title} className="card" style={{
                padding: 28,
                borderLeft: "4px solid var(--teal)",
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}>
                <h3 className="syne" style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{u.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--card)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>Take Control of Your Queues</h2>
          <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 32 }}>Real-time analytics. Actionable insights. Better service.</p>
          <button className="btn btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
            sign up
          </button>
        </div>
      </section>
    </div>
  );
}
