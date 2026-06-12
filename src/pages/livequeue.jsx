import React from "react";
import {
  FaArrowLeft,
  FaBell,
  FaUsers,
  FaClock,
  FaTachometerAlt,
  FaUserFriends,
  FaCheck,
} from "react-icons/fa";

const LiveQueueStatus = () => {
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Segoe UI',sans-serif;
        }

        .page{
          max-width:430px;
          margin:auto;
          min-height:100vh;
          background:#f8f8f8;
          padding:20px;
        }

        .header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:30px;
          margin-bottom:20px;
        }

        .logo{
          width:70px;
        }

        .icon{
          font-size:24px;
          cursor:pointer;
        }

        .title{
          font-size:32px;
          font-weight:700;
          color:#22243c;
          margin-bottom:15px;
        }

        .queue-card{
          background:#3aa89c;
          border-radius:14px 14px 0 0;
          padding:25px;
          text-align:center;
          color:white;
        }

        .queue-card h3{
          font-size:22px;
          margin-bottom:10px;
        }

        .queue-number{
          font-size:72px;
          font-weight:300;
          margin:10px 0;
        }

        .status{
          background:white;
          color:#3aa89c;
          display:inline-block;
          padding:10px 20px;
          border-radius:30px;
          font-weight:600;
        }

        .serving-card{
          background:#eef2f2;
          padding:20px;
          border-radius:0 0 14px 14px;
        }

        .top-row{
          display:flex;
          justify-content:space-between;
          margin-bottom:25px;
        }

        .small{
          color:#777;
          font-size:13px;
        }

        .number{
          font-size:28px;
          font-weight:600;
          color:#222;
          margin-top:5px;
        }

        .progress-row{
          display:flex;
          align-items:center;
          gap:5px;
          margin-bottom:15px;
        }

        .circle{
          width:26px;
          height:26px;
          border-radius:50%;
          background:#3aa89c;
          color:white;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:12px;
        }

        .line{
          flex:1;
          height:5px;
          border-radius:10px;
          background:#b5d7d4;
        }

        .line.active{
          background:#3aa89c;
        }

        .ahead{
          text-align:center;
          color:#555;
        }

        .stats{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:10px;
          margin-top:15px;
        }

        .stat-box{
          background:#eef2f2;
          border-radius:10px;
          padding:15px;
          text-align:center;
        }

        .stat-box svg{
          color:#3aa89c;
          font-size:20px;
          margin-bottom:10px;
        }

        .stat-title{
          font-size:11px;
          color:#555;
          margin-bottom:8px;
        }

        .stat-value{
          font-size:18px;
          font-weight:700;
          color:#444;
        }

        .stat-sub{
          font-size:12px;
          color:#444;
          margin-top:4px;
        }

        .activity{
          background:#eef2f2;
          border-radius:10px;
          padding:15px;
          margin-top:20px;
        }

        .activity-head{
          display:flex;
          justify-content:space-between;
          margin-bottom:15px;
        }

        .activity-title{
          font-weight:700;
          color:#333;
        }

        .live-badge{
          background:#3aa89c;
          color:white;
          padding:2px 8px;
          border-radius:10px;
          font-size:10px;
        }

        .activity-row{
          display:flex;
          justify-content:space-between;
          margin-bottom:12px;
          font-size:14px;
        }

        .served{
          color:#3aa89c;
          font-weight:600;
        }

        .preparing{
          color:#ff5722;
          font-weight:600;
        }

        .refresh-btn{
          width:100%;
          height:55px;
          border:none;
          background:#3aa89c;
          color:white;
          border-radius:10px;
          font-size:18px;
          font-weight:600;
          margin-top:30px;
          cursor:pointer;
        }

        @media(max-width:768px){
          .queue-number{
            font-size:58px;
          }

          .title{
            font-size:28px;
          }
        }
      `}</style>

      <div className="page">
        <div className="header">
          <FaArrowLeft className="icon" />

          {/* Replace with your logo */}
          <img
            src="https://via.placeholder.com/70x40"
            alt="logo"
            className="logo"
          />

          <FaBell className="icon" />
        </div>

        <h2 className="title">Your Queue Ticket</h2>

        <div className="queue-card">
          <h3>YOUR QUEUE NUMBER</h3>

          <div className="queue-number">A-025</div>

          <div className="status">IN QUEUE</div>
        </div>

        <div className="serving-card">
          <div className="top-row">
            <div>
              <div className="small">Now Serving</div>
              <div className="number">A-001</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="small">Your Number</div>
              <div className="number">A-025</div>
            </div>
          </div>

          <div className="progress-row">
            <div className="circle">
              <FaCheck />
            </div>

            <div className="line active"></div>
            <div className="line active"></div>
            <div className="line active"></div>
            <div className="line active"></div>

            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>

            <FaUserFriends
              style={{
                color: "#3aa89c",
                marginLeft: "5px",
              }}
            />
          </div>

          <div className="ahead">
            7 People ahead of you
          </div>
        </div>

        <div className="stats">
          <div className="stat-box">
            <FaUsers />
            <div className="stat-title">
              Current Position
            </div>
            <div className="stat-value">8</div>
            <div className="stat-sub">
              People Ahead
            </div>
          </div>

          <div className="stat-box">
            <FaClock />
            <div className="stat-title">
              Estimated Wait
            </div>
            <div className="stat-value">
              12 mins
            </div>
            <div className="stat-sub">
              Approx.
            </div>
          </div>

          <div className="stat-box">
            <FaTachometerAlt />
            <div className="stat-title">
              Queue Speed
            </div>
            <div className="stat-value">1</div>
            <div className="stat-sub">
              Customer every 2 min
            </div>
          </div>
        </div>

        <div className="activity">
          <div className="activity-head">
            <span className="activity-title">
              Live Activity
            </span>

            <span className="live-badge">
              Live
            </span>
          </div>

          <div className="activity-row">
            <strong>A-017</strong>
            <span className="served">
              Served
            </span>
            <span>9:38 AM</span>
          </div>

          <div className="activity-row">
            <strong>A-018</strong>
            <span className="served">
              Called
            </span>
            <span>9:39 AM</span>
          </div>

          <div className="activity-row">
            <strong>A-019</strong>
            <span className="preparing">
              Preparing
            </span>
            <span>9:40 AM</span>
          </div>
        </div>

        <button className="refresh-btn">
          Refresh Status
        </button>
      </div>
    </>
  );
};

export default LiveQueueStatus;