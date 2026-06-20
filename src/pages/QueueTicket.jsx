import {
  FaBell,
  FaUserCircle,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import Queueease from "../assets/Queueease.png";

const QueueTicket = ({
  ticketId,
  service,
  orgName,
  position,
  estimatedWait,
  joinedText,
  nowServingId,
  onViewLiveStatus,
  onLeaveQueue,
}) => {
  // Progress bar: 9 segments total, filled proportionally to how close
  // the person is to being served. Caps so it never overflows visually.
  const totalSegments = 9;
  const filledSegments = Math.max(
    0,
    Math.min(totalSegments, totalSegments - Math.ceil((position || 0) / 3))
  );

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Segoe UI',sans-serif;
        }

        .ticket-page{
          max-width:430px;
          min-height:100vh;
          margin:auto;
          padding:20px;
          background:#f8f8f8;
        }

        .top-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:40px;
          margin-bottom:25px;
        }

        .logo{
          width:70px;
        }

        .bell{
          font-size:28px;
          cursor:pointer;
        }

        h2{
          color:#23233c;
          margin-bottom:15px;
        }

        .ticket-card{
          background:#38a89d;
          border-radius:12px;
          color:white;
          text-align:center;
          padding:20px;
        }

        .ticket-card h3{
          font-size:26px;
          margin-bottom:10px;
        }

        .ticket-number{
          font-size:70px;
          font-weight:300;
          margin:10px 0;
        }

        .status{
          display:inline-block;
          background:white;
          color:#38a89d;
          padding:10px 18px;
          border-radius:30px;
          font-weight:600;
        }

        .info-card{
          background:#eef2f2;
          border-radius:12px;
          padding:20px;
          margin-top:15px;
        }

        .row{
          display:flex;
          align-items:center;
          margin-bottom:18px;
        }

        .row svg{
          color:#38a89d;
          margin-right:15px;
          font-size:18px;
        }

        .label{
          color:#777;
          width:130px;
        }

        .value{
          color:#222;
          font-weight:500;
        }

        .queue-status{
          background:#eef2f2;
          margin-top:18px;
          border-radius:12px;
          padding:18px;
        }

        .status-top{
          display:flex;
          justify-content:space-between;
          margin-bottom:20px;
        }

        .small{
          color:#777;
          font-size:13px;
        }

        .bold{
          font-size:28px;
          color:#222;
          font-weight:600;
        }

        .progress{
          display:flex;
          gap:4px;
          margin-bottom:15px;
        }

        .bar{
          flex:1;
          height:5px;
          border-radius:5px;
          background:#b7d7d3;
        }

        .active{
          background:#38a89d;
        }

        .notify{
          text-align:center;
          color:#555;
          font-size:14px;
        }

        .live-btn{
          width:100%;
          height:55px;
          border:none;
          border-radius:10px;
          background:#38a89d;
          color:white;
          font-size:18px;
          font-weight:600;
          margin-top:22px;
          cursor:pointer;
        }

        .leave-btn{
          width:100%;
          height:55px;
          background:white;
          color:#e60000;
          border:1px solid #ff6b6b;
          border-radius:10px;
          font-size:18px;
          font-weight:600;
          margin-top:12px;
          cursor:pointer;
        }

        @media(max-width:768px){
          .ticket-number{
            font-size:55px;
          }

          .label{
            width:110px;
            font-size:14px;
          }

          .value{
            font-size:14px;
          }
        }
      `}</style>

      <div className="ticket-page">
        <div className="top-header">
          <img src={Queueease} alt="QueueEase logo" className="logo" />
          <FaBell className="bell" />
        </div>

        <h2>Your Queue Ticket</h2>

        <div className="ticket-card">
          <h3>YOUR NUMBER</h3>
          <div className="ticket-number">{ticketId}</div>
          <div className="status">IN QUEUE</div>
        </div>

        <div className="info-card">
          <div className="row">
            <FaUserCircle />
            <span className="label">Service</span>
            <span className="value">{service}</span>
          </div>

          <div className="row">
            <FaMapMarkerAlt />
            <span className="label">Location</span>
            <span className="value">{orgName}</span>
          </div>

          <div className="row">
            <FaUsers />
            <span className="label">Your Position</span>
            <span className="value">{position}</span>
          </div>

          <div className="row">
            <FaClock />
            <span className="label">Estimated Wait Time</span>
            <span className="value">{estimatedWait} Minutes</span>
          </div>

          <div className="row">
            <span style={{ width: "33px" }}></span>
            <span className="label">Joined</span>
            <span className="value">{joinedText}</span>
          </div>
        </div>

        <div className="queue-status">
          <div className="status-top">
            <div>
              <div className="small">Now Serving</div>
              <div className="bold">{nowServingId}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="small">Your Number</div>
              <div className="bold">{ticketId}</div>
            </div>
          </div>

          <div className="progress">
            {Array.from({ length: totalSegments }, (_, i) => (
              <div
                key={i}
                className={`bar ${i < filledSegments ? "active" : ""}`}
              />
            ))}
          </div>

          <p className="notify">
            We'll notify you when you're 5 positions away
          </p>
        </div>

        <button className="live-btn" onClick={onViewLiveStatus}>
          View Live Status
        </button>

        <button className="leave-btn" onClick={onLeaveQueue}>
          Leave Queue
        </button>
      </div>
    </>
  );
};

export default QueueTicket;