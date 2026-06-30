import { useState } from "react";

export default function OfficerLanding({ onLoginAsOfficer = () => {} }) {

  const [hoveredBenefit, setHoveredBenefit] = useState(null);

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
            <h1 className="syne" style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16, overflowWrap: "anywhere" }}>
              Serve customers faster. Reduce queue chaos.
            </h1>
            <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 28 }}>
              Real-time queue management at your fingertips. One click. Next customer. Track performance and reduce stress.
            </p>
            <button className="btn btn-primary" style={{ fontSize: 15, padding: "14px 32px", marginBottom: 40 }}
              onClick={onLoginAsOfficer}>
              Log In as Officer
            </button>
            
            {/* Quick stats */}
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { num: "5", label: "waiting" },
                { num: "12", label: "served" },
                { num: "~8", label: "avg mins" }
              ].map(s => (
                <div key={s.label}>
                  <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: "var(--teal)" }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Dashboard mockup */}
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
                Staff Dashboard
              </div>
              
              {/* Content */}
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Organization</div>
                  <select style={{ width: "100%", padding: "6px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} readOnly>
                    <option>Ghana Health Service</option>
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Service Window</div>
                  <select style={{ width: "100%", padding: "6px", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} readOnly>
                    <option>General OPD</option>
                  </select>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, background: "var(--teal)", color: "#fff", border: "none", borderRadius: 6, padding: "9px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    📞 Call Next
                  </button>
                  <button style={{ flex: 1, background: "var(--cream)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 6, padding: "9px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    ✓ Served
                  </button>
                </div>

                {/* Current customer */}
                <div style={{ background: "var(--cream)", borderRadius: 8, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6 }}>Current Customer</div>
                  <div className="syne" style={{ fontSize: 24, fontWeight: 800, color: "var(--teal)", letterSpacing: ".03em" }}>GHS-90</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 6 }}>+233 XXXXXXXX</div>
                </div>

                {/* Next in queue */}
                <div>
                  <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Next in Queue</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11 }}>
                    {["GHS-91", "GHS-92", "GHS-93"].map(t => (
                      <div key={t} style={{ display: "flex", justifyContent: "space-between", padding: "6px", background: "var(--paper)", borderRadius: 4 }}>
                        <span className="mono" style={{ fontWeight: 600 }}>{t}</span>
                        <span style={{ color: "var(--muted)" }}>waiting</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--card)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 50, overflowWrap: "anywhere" }}>
            Why Officers Love QueueEase
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="col-2">
            {[
              { icon: "⚡", title: "Real-Time Updates", desc: "See the next customer instantly. No confusion. No delays." },
              { icon: "📊", title: "Track Performance", desc: "Monitor your service times and keep management informed." },
              { icon: "😌", title: "Reduce Stress", desc: "Let the system manage the queue. You focus on serving well." }
            ].map(b => (
              <div
                key={b.title}
                className="card"
                style={{
                  padding: 28,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all .2s",
                  transform: hoveredBenefit === b.title ? "translateY(-4px)" : "none",
                  boxShadow: hoveredBenefit === b.title ? "0 8px 24px rgba(0,137,123,.15)" : "var(--shadow)"
                }}
                onMouseEnter={() => setHoveredBenefit(b.title)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{b.icon}</div>
                <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{b.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ────────────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 50 }}>
            Your Daily Workflow
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="col-2">
            {[
              { num: 1, title: "Log In", desc: "Sign in with your officer credentials." },
              { num: 2, title: "See Next Customer", desc: "Dashboard shows who's next to be served." },
              { num: 3, title: "Serve & Move On", desc: "Mark served, move to next. System tracks everything." }
            ].map(w => (
              <div key={w.num} className="card" style={{ padding: 28, textAlign: "center" }}>
                <div className="syne" style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--teal)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 800,
                  margin: "0 auto 16px"
                }}>
                  {w.num}
                </div>
                <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--card)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>Make Your Job Easier</h2>
          <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 32 }}>Manage queues efficiently. Track your performance. Impress your boss.</p>
          <button className="btn btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}
            onClick={onLoginAsOfficer}>
            Access Officer Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}
