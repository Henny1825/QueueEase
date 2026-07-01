import { useState } from "react";
import "../styles/OfficerLanding.css";

export default function OfficerLanding({ onLoginAsOfficer = () => {} }) {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  return (
    <div className="fade-up flex flex-col gap-0">
      {/* ── HERO SECTION ────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-container">
          {/* LEFT: Content */}
          <div>
            <h1 className="syne hero-heading">
              Serve customers faster. Reduce queue chaos.
            </h1>
            <p className="hero-paragraph">
              Real-time queue management at your fingertips. One click. Next
              customer. Track performance and reduce stress.
            </p>
            <button
              className="btn btn-primary hero-btn"
              onClick={onLoginAsOfficer}
            >
              Log In as Officer
            </button>

            {/* Quick stats */}
            <div className="flex gap-8">
              {[
                { num: "5", label: "waiting" },
                { num: "12", label: "served" },
                { num: "~8", label: "avg mins" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="syne hero-stat--num">{s.num}</div>
                  <div className="hero-stat--label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Dashboard mockup */}
          <div className="flex justify-center">
            <div className="phone-container">
              {/* Header */}
              <div className="phone-heading">Staff Dashboard</div>

              {/* Content */}
              <div className="phone-content">
                <div>
                  <div className="phone-content-label">Organization</div>
                  <select className="phone-content-input" readOnly>
                    <option>Ghana Health Service</option>
                  </select>
                </div>

                <div>
                  <div className="phone-content-label">Service Window</div>
                  <select className="phone-content-input" readOnly>
                    <option>General OPD</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="phone-content-btn phone-content-btn--primary">
                    📞 Call Next
                  </button>
                  <button className="phone-content-btn phone-content-btn--secondary">
                    ✓ Served
                  </button>
                </div>

                {/* Current customer */}
                <div className="phone-current-customer-container">
                  <div className="phone-current-customer-label">
                    Current Customer
                  </div>
                  <div className="syne phone-current-customer-num">GHS-90</div>
                  <div className="phone-current-customer-contact">
                    +233 XXXXXXXX
                  </div>
                </div>

                {/* Next in queue */}
                <div>
                  <div className="phone-customer-queue-heading">
                    Next in Queue
                  </div>
                  <div className="phone-customer-queue-list">
                    {["GHS-91", "GHS-92", "GHS-93"].map((t) => (
                      <div key={t} className="phone-customer-queue-item">
                        <span className="mono" style={{ fontWeight: 600 }}>
                          {t}
                        </span>
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
      <section className="benefits-workflow-cta-section">
        <div className="benefits-workflow-cta-container">
          <h2 className="syne benefits-workflow-cta-heading">
            Why Officers Love QueueEase
          </h2>

          <div className="grid grid-cols-3 gap-7">
            {[
              {
                icon: "⚡",
                title: "Real-Time Updates",
                desc: "See the next customer instantly. No confusion. No delays.",
              },
              {
                icon: "📊",
                title: "Track Performance",
                desc: "Monitor your service times and keep management informed.",
              },
              {
                icon: "😌",
                title: "Reduce Stress",
                desc: "Let the system manage the queue. You focus on serving well.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="card benefits-workflow-card"
                style={{
                  transform:
                    hoveredBenefit === b.title ? "translateY(-4px)" : "none",
                  boxShadow:
                    hoveredBenefit === b.title
                      ? "0 8px 24px rgba(0,137,123,.15)"
                      : "var(--shadow)",
                }}
                onMouseEnter={() => setHoveredBenefit(b.title)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className="benefits-card-icon">{b.icon}</div>
                <h3 className="syne benefits-workflow-card-title">{b.title}</h3>
                <p className="benefits--workflow-card-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ────────────────────────────────────────── */}
      <section className="benefits-workflow-cta-section">
        <div className="benefits-workflow-cta-container">
          <h2 className="syne benefits-workflow-cta-heading">
            Your Daily Workflow
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {[
              {
                num: 1,
                title: "Log In",
                desc: "Sign in with your officer credentials.",
              },
              {
                num: 2,
                title: "See Next Customer",
                desc: "Dashboard shows who's next to be served.",
              },
              {
                num: 3,
                title: "Serve & Move On",
                desc: "Mark served, move to next. System tracks everything.",
              },
            ].map((w) => (
              <div key={w.num} className="card benefits-workflow-card">
                <div className="syne workflow-card-num">{w.num}</div>
                <h3 className="syne benefits-workflow-card-title">{w.title}</h3>
                <p className="benefits-workflow-card-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="benefits-workflow-cta-section">
        <div className="benefits-workflow-cta-container text-center">
          <h2 className="syne benefits-workflow-cta-heading">
            Make Your Job Easier
          </h2>
          <p className="cta-paragraph">
            Manage queues efficiently. Track your performance. Impress your
            boss.
          </p>
          <button
            className="btn btn-primary cta-btn"
            onClick={onLoginAsOfficer}
          >
            Access Officer Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}
