import React from "react";
import {
  FaArrowLeft,
  FaBell,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaExclamation,
} from "react-icons/fa";

const NextInQueue = () => {
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
          min-height:100vh;
          margin:auto;
          background:#f8f8f8;
          padding:20px;
        }

        .header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:30px;
          margin-bottom:30px;
        }

        .logo{
          width:70px;
        }

        .icon{
          font-size:24px;
          cursor:pointer;
          color:#000;
        }

        .alert-card{
          background:#38A89D;
          border-radius:14px;
          padding:25px 20px;
          text-align:center;
          color:#fff;
        }

        .alert-icon{
          width:54px;
          height:54px;
          border-radius:50%;
          background:#fff;
          color:#38A89D;
          display:flex;
          align-items:center;
          justify-content:center;
          margin:0 auto 15px;
          font-size:28px;
        }

        .alert-card h2{
          font-size:24px;
          margin-bottom:5px;
        }

        .alert-card p{
          font-size:14px;
          margin-bottom:15px;
        }

        .ticket-box{
          background:#EEF2F2;
          border-radius:16px;
          padding:15px;
          margin-top:15px;
        }

        .ticket-title{
          color:#666;
          font-weight:600;
          font-size:14px;
        }

        .ticket-number{
          font-size:56px;
          color:#38A89D;
          font-weight:300;
          margin:5px 0;
        }

        .status{
          display:inline-block;
          background:#38A89D;
          color:#fff;
          padding:8px 20px;
          border-radius:30px;
          font-size:14px;
          font-weight:600;
        }

        .stats{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:10px;
          margin-top:20px;
        }

        .stat-card{
          background:#EEF2F2;
          border-radius:10px;
          padding:15px 10px;
          text-align:center;
        }

        .stat-card svg{
          color:#38A89D;
          font-size:20px;
          margin-bottom:10px;
        }

        .stat-label{
          font-size:11px;
          color:#666;
          margin-bottom:8px;
        }

        .stat-value{
          font-size:18px;
          font-weight:700;
          color:#333;
        }

        .stat-sub{
          font-size:13px;
          color:#444;
          margin-top:5px;
          font-weight:600;
        }

        .primary-btn{
          width:100%;
          height:55px;
          border:none;
          border-radius:10px;
          background:#38A89D;
          color:#fff;
          font-size:18px;
          font-weight:600;
          margin-top:30px;
          cursor:pointer;
        }

        .secondary-btn{
          width:100%;
          height:55px;
          border:1px solid #38A89D;
          border-radius:10px;
          background:#fff;
          color:#38A89D;
          font-size:18px;
          font-weight:600;
          margin-top:15px;
          cursor:pointer;
        }

        @media(max-width:768px){
          .ticket-number{
            font-size:50px;
          }

          .alert-card h2{
            font-size:22px;
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

        <div className="alert-card">

          <div className="alert-icon">
            <FaExclamation />
          </div>

          <h2>You're Next!</h2>

          <p>Please proceed to the service center</p>

          <div className="ticket-box">
            <div className="ticket-title">
              YOUR NUMBER
            </div>

            <div className="ticket-number">
              A-025
            </div>

            <div className="status">
              IN QUEUE
            </div>
          </div>
        </div>

        <div className="stats">

          <div className="stat-card">
            <FaUsers />
            <div className="stat-label">
              People Ahead
            </div>
            <div className="stat-value">0</div>
          </div>

          <div className="stat-card">
            <FaClock />
            <div className="stat-label">
              Estimated Wait
            </div>
            <div className="stat-card">
            <FaClock />
            <div className="stat-label">Estimated Wait</div>
            {/* Wrapped the string safely to prevent syntax crashes */}
            <div className="stat-value">{"< 2 mins"}</div></div>
          </div>

          <div className="stat-card">
            <FaMapMarkerAlt />
            <div className="stat-label">
              Lagos
            </div>
            <div className="stat-sub">
              Lagos Service Center
            </div>
          </div>

        </div>

        <button className="primary-btn">
          I'm On My Way
        </button>

        <button className="secondary-btn">
          Need More Time?
        </button>

      </div>
    </>
  );
};

export default NextInQueue;