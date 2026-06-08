export default function TicketCard({ ticket, position, org, estimatedWait }) {
  if (!ticket) return null;

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Main Ticket Card */}
      <div className="card" style={{
        padding: 32,
        background: "linear-gradient(135deg, var(--teal), var(--teal2))",
        color: "#fff",
        textAlign: "center",
        borderRadius: 20
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, marginBottom: 12 }}>
          YOUR NUMBER
        </div>
        <div className="mono" style={{ fontSize: 64, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 16 }}>
          {ticket.id}
        </div>
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.2)",
          padding: "6px 16px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em"
        }}>
          IN QUEUE
        </div>
      </div>

      {/* Queue Status Info */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
          {/* Your Position */}
          <div style={{ textAlign: "center" }}>
            <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: "var(--teal)" }}>
              {position + 1}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 4 }}>
              In Line
            </div>
          </div>

          {/* Estimated Wait */}
          <div style={{ textAlign: "center" }}>
            <div className="syne" style={{ fontSize: 28, fontWeight: 800 }}>
              {estimatedWait}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 4 }}>
              Minutes
            </div>
          </div>

          {/* People Ahead */}
          <div style={{ textAlign: "center" }}>
            <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: "var(--amber)" }}>
              {position}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 4 }}>
              Ahead
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
            <span style={{ color: "var(--muted)" }}>📍 Location</span>
            <span style={{ fontWeight: 600 }}>{org?.name.split("–")[0].trim()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
            <span style={{ color: "var(--muted)" }}>🕐 Joined</span>
            <span style={{ fontWeight: 600 }}>{ticket.joinedAt?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "var(--muted)" }}>📱 Channel</span>
            <span style={{ fontWeight: 600 }}>{ticket.channel?.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="q-bar" style={{ height: 12, marginBottom: 8 }}>
        <div className="q-bar-fill" style={{ width: `${Math.max((10 - position) / 10 * 100, 0)}%` }} />
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", paddingTop: 13, paddingBottom: 13 }}>
          I'm On My Way
        </button>
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
          Need More Time?
        </button>
        <button className="btn btn-danger" style={{ width: "100%", justifyContent: "center" }}>
          Leave Queue
        </button>
      </div>
    </div>
  );
}