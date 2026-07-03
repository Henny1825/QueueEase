import { useState } from "react";
import "../styles/UserLanding.css";

export default function CitizenLanding({ onStartQueuing }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="fade-up main-container">
      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-container">
          {/* LEFT: Content */}
          <div>
            <h1 className="syne hero-heading">
              Skip the physical line. Get served in seconds.
            </h1>
            <p className="hero-paragraph">
              Join queues via WhatsApp, Web, or SMS. No waiting required. Get a
              token instantly and track your position in real-time.
            </p>
            <button className="btn btn-primary hero-btn" onClick={onStartQueuing}>
              Join Queue Now
            </button>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { num: "5", label: "waiting" },
                { num: "48", label: "est. mins" },
                { num: "8", label: "min/person" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="syne hero-stat--num">{s.num}</div>
                  <div className="hero-stat--label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Visual (Phone mockup placeholder) */}
          <div className="flex justify-center items-center">
            <div className="phone-container flex flex-col gap-3 overflow-hidden">
              {/* Phone screen content */}
              <div className="phone-main-content flex flex-col gap-2.5 flex-1">
                <div className="phone-main-content--heading">
                  Ghana Health Service
                </div>
                <input
                  placeholder="General OPD"
                  className="phone-main-content--input"
                  readOnly
                />
                <input
                  placeholder="+233 XXXXXXXX"
                  className="phone-main-content--input"
                  readOnly
                />
                <div className="flex gap-1.5 flex-wrap">
                  {["WhatsApp", "Web", "SMS", "USSD"].map((ch) => (
                    <span
                      key={ch}
                      style={{
                        fontSize: 10,
                        background:
                          ch === "WhatsApp" ? "var(--teal)" : "var(--cream)",
                        color: ch === "WhatsApp" ? "#fff" : "var(--muted)",
                        padding: "4px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
                <button className="phone-main-content--btn">Get Token</button>
              </div>

              {/* Queue display */}
              <div className="phone-queue-status-container flex flex-col gap-1.5">
                <div className="phone-queue-status-heading">
                  📍 Queue Status
                </div>
                <div className="flex justify-between">
                  <span>5 waiting</span>
                  <span>~48 mins</span>
                </div>
                <div className="phone-queue-status-progress--outer">
                  <div className="phone-queue-status-progress--inner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="syne features-heading">Why Choose Queue&shy;Ease?</h2>

          <div className="cards grid grid-cols-3 gap-7">
            {[
              {
                icon: "📱",
                title: "Multiple Channels",
                desc: "Join via WhatsApp, Web, SMS, or USSD. Choose what works for you.",
              },
              {
                icon: "⏱️",
                title: "Real-Time Updates",
                desc: "See your position in queue and estimated wait time, updated live.",
              },
              {
                icon: "✨",
                title: "Zero Waiting",
                desc: "Reduce time wasted in physical lines. Get called when it's your turn.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="card features-card"
                style={{
                  transform:
                    hoveredFeature === f.title ? "translateY(-4px)" : "none",
                  boxShadow:
                    hoveredFeature === f.title
                      ? "0 8px 24px rgba(0,137,123,.15)"
                      : "var(--shadow)",
                }}
                onMouseEnter={() => setHoveredFeature(f.title)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="features-card-icon">{f.icon}</div>
                <h3 className="syne features-card-title">{f.title}</h3>
                <p className="features-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="syne cta-heading">Ready to skip the line?</h2>
          <p className="cta-paragraph">
            Get your queue ticket in seconds. No forms, no waiting.
          </p>
          <button
            className="btn btn-primary cta-btn"
            style={{ fontSize: 16, padding: "16px 40px" }}
            onClick={onStartQueuing}
          >
            Get My Ticket Now
          </button>
        </div>
      </section>
    </div>
  );
}
