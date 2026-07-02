import { useState } from "react";
import "../styles/ManagerLanding.css";

export default function ManagerLanding({ onSignupClick }) {
  const [hoveredInsight, setHoveredInsight] = useState(null);

  return (
    <div className="fade-up flex flex-col gap-0">
      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-container">
          {/* LEFT: Content */}
          <div>
            <h1 className="syne hero-heading">
              Real-time insights. Smarter queue management.
            </h1>
            <p className="hero-paragraph">
              Monitor queue performance across all organizations. Data-driven
              decisions made simple. Optimize staffing and improve citizen
              satisfaction.
            </p>
            <button
              className="btn btn-primary hero-btn"
              onClick={onSignupClick}
            >
              Sign Up
            </button>

            {/* Key metrics */}
            <div className="flex gap-8">
              {[
                { num: "58", label: "total waiting" },
                { num: "9", label: "served today" },
                { num: "11", label: "avg wait" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="syne hero-stat--num">{m.num}</div>
                  <div className="hero-stat--label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Analytics mockup */}
          <div className="flex justify-center">
            <div className="analytics-container">
              {/* Header */}
              <div className="analytics-heading">Analytics</div>

              {/* Content */}
              <div className="analytics-content">
                {/* Stats boxes */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "58", lbl: "Waiting" },
                    { val: "9", lbl: "Served" },
                    { val: "4", lbl: "Orgs" },
                    { val: "11", lbl: "Avg Wait" },
                  ].map((s) => (
                    <div className="analytics-card" key={s.lbl}>
                      <div className="syne analytics-card--value">{s.val}</div>
                      <div className="analytics-card--label">{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Queue load by org */}
                <div>
                  <div className="analytics-queue-load-heading">Queue Load</div>
                  {[
                    { name: "Ghana Health Service", pct: 75 },
                    { name: "DVLA Office", pct: 65 },
                    { name: "GRA", pct: 55 },
                  ].map((org) => (
                    <div key={org.name} style={{ marginBottom: 8 }}>
                      <div className="analytics-queue-load-org">
                        <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                          {org.name.split(" ")[0]}
                        </span>
                        <span style={{ color: "var(--muted)" }}>
                          {org.pct}%
                        </span>
                      </div>
                      <div className="analytics-queue-load-progress--outer">
                        <div
                          style={{
                            height: "100%",
                            width: `${org.pct}%`,
                            background:
                              org.pct > 70
                                ? "linear-gradient(90deg, var(--rose), #ff8a65)"
                                : "linear-gradient(90deg, var(--teal), var(--teal2))",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Export button */}
                <button className="analytics-btn">📊 Export Report</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MONITOR SECTION ─────────────────────────────────── */}
      <section className="monitor-cta-section">
        <div className="monitor-use-case-cta-container">
          <h2 className="syne monitor-use-case-cta-heading">
            Monitor Everything That Matters
          </h2>

          <div className="grid grid-cols-3 gap-7">
            {[
              {
                icon: "📈",
                title: "Live Metrics",
                desc: "Real-time data on queue depth, service times, and performance.",
              },
              {
                icon: "👥",
                title: "Multi-Organization",
                desc: "See metrics across all your agencies in one dashboard.",
              },
              {
                icon: "🎯",
                title: "Actionable Insights",
                desc: "Identify bottlenecks. Optimize staffing. Improve satisfaction.",
              },
            ].map((m) => (
              <div
                key={m.title}
                className="card monitor-card"
                style={{
                  transform:
                    hoveredInsight === m.title ? "translateY(-4px)" : "none",
                  boxShadow:
                    hoveredInsight === m.title
                      ? "0 8px 24px rgba(0,137,123,.15)"
                      : "var(--shadow)",
                }}
                onMouseEnter={() => setHoveredInsight(m.title)}
                onMouseLeave={() => setHoveredInsight(null)}
              >
                <div className="monitor-card-icon">{m.icon}</div>
                <h3 className="syne monitor-card-title">{m.title}</h3>
                <p className="monitor-card-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ───────────────────────────────────────── */}
      <section className="use-case-section">
        <div className="monitor-use-case-cta-container">
          <h2 className="syne monitor-use-case-cta-heading">
            Make Data-Driven Decisions
          </h2>

          <div className="grid grid-cols-3 gap-7">
            {[
              {
                title: "Optimize Staffing",
                desc: "See peak hours. Adjust officer schedules. Reduce wait times.",
              },
              {
                title: "Track Performance",
                desc: "Monitor which services are slowest. Where should you invest?",
              },
              {
                title: "Improve Citizens",
                desc: "Reduce wait times. Build trust. Improve satisfaction ratings.",
              },
            ].map((u) => (
              <div key={u.title} className="card use-case-card">
                <h3 className="syne use-case-card--title">{u.title}</h3>
                <p className="use-case-card--desc">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="monitor-cta-section">
        <div className="monitor-use-case-cta-container text-center">
          <h2 className="syne monitor-use-case-cta-heading">
            Take Control of Your Queues
          </h2>
          <p className="cta-paragraph">
            Real-time analytics. Actionable insights. Better service.
          </p>
          <button className="btn btn-primary cta-btn" onClick={onSignupClick}>
            sign up
          </button>
        </div>
      </section>
    </div>
  );
}
