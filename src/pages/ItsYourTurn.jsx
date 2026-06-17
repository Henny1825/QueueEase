import React from "react";
import {
  FaArrowLeft,
  FaBell,
  FaExclamation,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ItsYourTurn = () => {
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
          margin-bottom:35px;
        }

        .logo{
          width:70px;
        }

        .icon{
          font-size:24px;
          color:#000;
          cursor:pointer;
        }

        .main-card{
          background:#39A89D;
          border-radius:14px;
          padding:25px 20px;
          text-align:center;
          color:white;
        }

        .alert-icon{
          width:55px;
          height:55px;
          background:white;
          color:#39A89D;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          margin:0 auto 15px;
          font-size:26px;
        }

        .title{
          font-size:22px;
          font-weight:700;
        }

        .subtitle{
          font-size:13px;
          margin-top:5px;
          margin-bottom:15px;
        }

        .ticket-box{
          background:#EEF2F2;
          border-radius:16px;
          padding:15px;
          color:#333;
        }

        .ticket-label{
          color:#666;
          font-size:14px;
          font-weight:600;
        }

        .ticket-number{
          font-size:52px;
          color:#39A89D;
          font-weight:300;
          margin:5px 0 10px;
        }

        .counter-row{
          display:flex;
          justify-content:center;
          align-items:center;
          gap:10px;
          margin-bottom:15px;
        }

        .counter-text{
          color:#39A89D;
          font-size:14px;
        }

        .counter-badge{
          background:#39A89D;
          color:white;
          padding:8px 18px;
          border-radius:6px;
          font-weight:600;
          font-size:14px;
        }

        .location{
          display:flex;
          justify-content:center;
          align-items:center;
          gap:8px;
          color:#333;
          font-size:14px;
        }

        .timer-text{
          margin-top:15px;
          font-size:14px;
        }

        .timer{
          display:flex;
          justify-content:center;
          align-items:center;
          gap:12px;
          margin-top:10px;
        }

        .timer svg{
          font-size:34px;
        }

        .time{
          font-size:50px;
          font-weight:300;
        }

        .time-label{
          font-size:14px;
          margin-top:-5px;
        }

        .btn-primary{
          width:100%;
          height:55px;
          border:none;
          border-radius:10px;
          background:#39A89D;
          color:white;
          font-size:18px;
          font-weight:600;
          margin-top:20px;
          cursor:pointer;
        }

        .btn-secondary{
          width:100%;
          height:55px;
          border:1px solid #39A89D;
          border-radius:10px;
          background:white;
          color:#39A89D;
          font-size:18px;
          font-weight:600;
          margin-top:15px;
          cursor:pointer;
        }

        @media(max-width:768px){
          .ticket-number{
            font-size:46px;
          }

          .time{
            font-size:42px;
          }
        }
      `}</style>

      <div className="page">

        <div className="header">
          <FaArrowLeft className="icon" />

          {/* Replace with your logo */}
          <img
            src="https://via.placeholder.com/70x40"
            alt="QueueEase Logo"
            className="logo"
          />

          <FaBell className="icon" />
        </div>

        <div className="main-card">

          <div className="alert-icon">
            <FaExclamation />
          </div>

          <div className="title">
            It's Your Turn!
          </div>

          <div className="subtitle">
            Please proceed to the counter.
          </div>

          <div className="ticket-box">

            <div className="ticket-label">
              YOUR NUMBER
            </div>

            <div className="ticket-number">
              A-025
            </div>

            <div className="counter-row">
              <span className="counter-text">
                Proceed to
              </span>

              <span className="counter-badge">
                Counter 3
              </span>
            </div>

            <div className="location">
              <FaMapMarkerAlt />
              <span>Lagos Service Center</span>
            </div>

          </div>

          <div className="timer-text">
            Please check in before the time runs out
          </div>

          <div className="timer">
            <FaClock />

            <div>
              <div className="time">
                03:00
              </div>

              <div className="time-label">
                Time remaining
              </div>
            </div>
          </div>

        </div>

        <button className="btn-primary">
          I'm Here
        </button>

        <button className="btn-secondary">
          Need Help?
        </button>

      </div>
    </>
  );
};

export default ItsYourTurn;