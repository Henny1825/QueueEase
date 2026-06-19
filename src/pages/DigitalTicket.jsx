export default function DigitalTicket({ ticket, position, orgName, service, onBackToQueue, onLeaveQueue }) {
  if (!ticket) return null;

  const ticketState =
    ticket.status === "done" ? "completed"
    : position === 0 ? "serving"
    : position === 1 ? "next"
    : "waiting";

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--paper)",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{ position: "absolute", top: 20, left: 20, fontSize: 12, color: "var(--muted)" }}>
        9:30
      </div>

      <button
        onClick={onBackToQueue}
        style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--ink)" }}
      >
        ←
      </button>

      <div style={{ marginBottom: 30, fontSize: 28, fontWeight: 800, color: "var(--teal)" }}>
        🔗 QueueEase
      </div>

      <div style={{
        width: "100%",
        maxWidth: 400,
        background: "linear-gradient(135deg, var(--teal), var(--teal2))",
        borderRadius: 20,
        padding: 40,
        textAlign: "center",
        color: "#fff",
        marginBottom: 40,
        boxShadow: "0 8px 32px rgba(0,137,123,0.3)"
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9, marginBottom: 16, textTransform: "uppercase" }}>
          Your Queue Number
        </div>

        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 20, fontFamily: "'DM Mono', monospace" }}>
          {ticket.id}
        </div>

        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.25)",
          padding: "8px 20px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 20
        }}>
          {ticketState === "waiting" ? "IN QUEUE" : ticketState === "next" ? "NEXT UP" : ticketState === "serving" ? "BEING SERVED" : "COMPLETED"}
        </div>

        <div style={{ fontSize: 14, opacity: 0.95, marginTop: 20 }}>
          <div style={{ opacity: 0.8, fontSize: 12 }}>{service}</div>
          <div style={{ fontWeight: 600 }}>{orgName}</div>
        </div>
      </div>

      {ticketState === "waiting" && (
        <div style={{ width: "100%", maxWidth: 400, background: "white", borderRadius: 16, padding: 24, border: "1px solid var(--border)", marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--amber)", fontFamily: "'Syne', sans-serif" }}>
                {position}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", marginTop: 4 }}>
                People Ahead
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--teal)", fontFamily: "'Syne', sans-serif" }}>
                {position * 8}
              </div>
              <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", marginTop: 4 }}>
                Est. Minutes
              </div>
            </div>
          </div>

          <div style={{ height: 8, background: "var(--cream)", borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--teal), var(--teal2))",
              width: `${Math.max((10 - position) / 10 * 100, 0)}%`,
              transition: "width 0.6s ease"
            }} />
          </div>

          <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginBottom: 16 }}>
            {Math.round((10 - position) / 10 * 100)}% of the way
          </div>

          <div style={{ background: "var(--paper)", borderRadius: 8, padding: 12, fontSize: 12, color: "var(--muted)" }}>
            <div style={{ marginBottom: 6 }}>🔊 <strong>Live Activity</strong></div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>
              {position === 0 ? "Your turn is coming up!" : `${position} people ahead`}
            </div>
          </div>
        </div>
      )}

      {ticketState === "next" && (
        <div style={{ width: "100%", maxWidth: 400, background: "white", borderRadius: 16, padding: 40, textAlign: "center", border: "1px solid var(--border)", marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⏰</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--teal)", marginBottom: 8 }}>You're Next!</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Please proceed to the counter</div>
        </div>
      )}

      {ticketState === "serving" && (
        <div style={{ width: "100%", maxWidth: 400, background: "white", borderRadius: 16, padding: 40, textAlign: "center", border: "1px solid var(--border)", marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🟢</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--teal)", marginBottom: 8 }}>It's Your Turn!</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Please report to counter immediately</div>
        </div>
      )}

      {ticketState === "completed" && (
        <div style={{ width: "100%", maxWidth: 400, background: "white", borderRadius: 16, padding: 40, textAlign: "center", border: "1px solid var(--border)", marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--teal)", marginBottom: 8 }}>Service Completed</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>Thank you for using QueueEase</div>
        </div>
      )}

      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 12 }}>
        {ticketState === "waiting" && (
          <>
            <button style={{ width: "100%", padding: "14px 20px", background: "var(--teal)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              I'm On My Way
            </button>
            <button style={{ width: "100%", padding: "14px 20px", background: "white", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Need More Time?
            </button>
          </>
        )}

        {ticketState === "next" && (
          <button style={{ width: "100%", padding: "14px 20px", background: "var(--teal)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            I'm Here
          </button>
        )}

        {ticketState === "serving" && (
          <button style={{ width: "100%", padding: "14px 20px", background: "#e8f5e9", color: "var(--teal)", border: "1px solid #a5d6a7", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            ✓ Service Complete
          </button>
        )}

        {ticketState === "completed" ? (
          <button onClick={onBackToQueue} style={{ width: "100%", padding: "14px 20px", background: "var(--teal)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Join Another Queue
          </button>
        ) : (
          <button
            onClick={onLeaveQueue}
            style={{ width: "100%", padding: "14px 20px", background: "#ffe0e0", color: "var(--rose)", border: "1px solid #ffcdd2", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Leave Queue
          </button>
        )}
      </div>
    </div>
  );
}