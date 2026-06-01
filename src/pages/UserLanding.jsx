import { useState } from "react";

export default function CitizenLanding({ onStartQueuing }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

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
              Skip the physical line. Get served in seconds.
            </h1>
            <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.6, marginBottom: 28 }}>
              Join queues via WhatsApp, Web, or SMS. No waiting required. Get a token instantly and track your position in real-time.
            </p>
            <button className="btn btn-primary" style={{ fontSize: 15, padding: "14px 32px", marginBottom: 40 }}
              onClick={onStartQueuing}>
              Join Queue Now
            </button>
            <button className="btn btn-primary" style={{ fontSize: 15, padding: "14px 32px", marginBottom: 40 }}>
              sign up
            </button>
            
            {/* Stats */}
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { num: "5", label: "waiting" },
                { num: "48", label: "est. mins" },
                { num: "8", label: "min/person" }
              ].map(s => (
                <div key={s.label}>
                  <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: "var(--teal)" }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Visual (Phone mockup placeholder) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              width: 280,
              height: 560,
              background: "var(--card)",
              borderRadius: 28,
              border: "12px solid var(--ink)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              overflow: "hidden"
            }}>
              {/* Phone screen content */}
              <div style={{ background: "var(--cream)", borderRadius: 8, padding: 14, flex: 1, display: "flex", flexDirection: "column", gap: 10, fontSize: 12 }}>
                <div style={{ fontWeight: 700, color: "var(--teal)" }}>Ghana Health Service</div>
                <input placeholder="General OPD" style={{ padding: 6, border: "1px solid var(--border)", borderRadius: 4, fontSize: 11 }} readOnly />
                <input placeholder="+233 XXXXXXXX" style={{ padding: 6, border: "1px solid var(--border)", borderRadius: 4, fontSize: 11 }} readOnly />
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["WhatsApp", "Web", "SMS", "USSD"].map(ch => (
                    <span key={ch} style={{ fontSize: 10, background: ch === "WhatsApp" ? "var(--teal)" : "var(--cream)", color: ch === "WhatsApp" ? "#fff" : "var(--muted)", padding: "4px 8px", borderRadius: 4 }}>{ch}</span>
                  ))}
                </div>
                <button style={{ background: "var(--teal)", color: "#fff", border: "none", borderRadius: 4, padding: "8px", fontSize: 11, fontWeight: 600, marginTop: 8 }}>Get Token</button>
              </div>
              
              {/* Queue display */}
              <div style={{ background: "var(--cream)", borderRadius: 8, padding: 10, display: "flex", flexDirection: "column", gap: 6, fontSize: 10 }}>
                <div style={{ fontWeight: 700, color: "var(--teal)" }}>📍 Queue Status</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>5 waiting</span>
                  <span>~48 mins</span>
                </div>
                <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "25%", background: "linear-gradient(90deg, var(--teal), var(--teal2))" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--card)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 50 }}>
            Why Choose QueueEase?
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="col-2">
            {[
              { icon: "📱", title: "Multiple Channels", desc: "Join via WhatsApp, Web, SMS, or USSD. Choose what works for you." },
              { icon: "⏱️", title: "Real-Time Updates", desc: "See your position in queue and estimated wait time, updated live." },
              { icon: "✨", title: "Zero Waiting", desc: "Reduce time wasted in physical lines. Get called when it's your turn." }
            ].map(f => (
              <div
                key={f.title}
                className="card"
                style={{
                  padding: 28,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all .2s",
                  transform: hoveredFeature === f.title ? "translateY(-4px)" : "none",
                  boxShadow: hoveredFeature === f.title ? "0 8px 24px rgba(0,137,123,.15)" : "var(--shadow)"
                }}
                onMouseEnter={() => setHoveredFeature(f.title)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{f.icon}</div>
                <h3 className="syne" style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────── */}
      <section style={{ padding: "60px 20px", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 className="syne" style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>Ready to skip the line?</h2>
          <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 32 }}>Get your queue ticket in seconds. No forms, no waiting.</p>
          <button className="btn btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}
            onClick={onStartQueuing}>
            Get My Ticket Now
          </button>
        </div>
      </section>
    </div>
  );
}
