import React from "react";
import {
  FaArrowLeft,
  FaIdCard,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
} from "react-icons/fa";

const ConfirmQueue = () => {
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Segoe UI, sans-serif;
        }

        .confirm-page{
          min-height:100vh;
          background:#f8f8f8;
          padding:30px 20px;
          max-width:430px;
          margin:auto;
        }

        .top-bar{
          margin-bottom:40px;
        }

        .back-icon{
          font-size:22px;
          color:#222;
          cursor:pointer;
        }

        .header h2{
          font-size:32px;
          color:#202033;
          margin-bottom:10px;
          font-weight:700;
        }

        .header p{
          color:#666;
          font-size:14px;
          margin-bottom:35px;
        }

        .details-card{
          background:#fff;
          border:1px solid #ddd;
          border-radius:12px;
          padding:18px;
        }

        .detail-item{
          display:flex;
          align-items:center;
          gap:15px;
          padding:12px 0;
        }

        .icon-box{
          width:54px;
          height:54px;
          border-radius:14px;
          background:#b8dcdc;
          color:white;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:20px;
          flex-shrink:0;
        }

        .active{
          background:#35a89b;
        }

        .detail-text span{
          font-size:12px;
          color:#888;
        }

        .detail-text h4{
          margin-top:4px;
          font-size:16px;
          color:#222;
          font-weight:500;
        }

        .divider{
          height:1px;
          background:#e5e5e5;
        }

        .notification-box{
          background:#eef2f2;
          border-radius:10px;
          text-align:center;
          padding:20px;
          margin-top:20px;
          color:#344;
          line-height:1.7;
          font-size:14px;
        }

        .confirm-btn{
          width:100%;
          height:55px;
          border:none;
          border-radius:10px;
          background:#35a89b;
          color:white;
          font-size:22px;
          font-weight:600;
          margin-top:40px;
          cursor:pointer;
        }

        .back-btn{
          width:100%;
          height:55px;
          border:1px solid #666;
          border-radius:10px;
          background:white;
          color:#333;
          font-size:22px;
          font-weight:600;
          margin-top:15px;
          cursor:pointer;
        }

        @media(max-width:768px){
          .header h2{
            font-size:28px;
          }

          .confirm-btn,
          .back-btn{
            font-size:18px;
          }
        }
      `}</style>

      <div className="confirm-page">
        <div className="top-bar">
          <FaArrowLeft className="back-icon" />
        </div>

        <div className="header">
          <h2>Confirm Queue Selected</h2>
          <p>Please review your details before joining the queue</p>
        </div>

        <div className="details-card">
          <div className="detail-item">
            <div className="icon-box active">
              <FaIdCard />
            </div>
            <div className="detail-text">
              <span>Service</span>
              <h4>Passport Renewal</h4>
            </div>
          </div>

          <div className="divider"></div>

          <div className="detail-item">
            <div className="icon-box">
              <FaMapMarkerAlt />
            </div>
            <div className="detail-text">
              <span>Location</span>
              <h4>Lagos Service Center</h4>
            </div>
          </div>

          <div className="divider"></div>

          <div className="detail-item">
            <div className="icon-box">
              <FaUsers />
            </div>
            <div className="detail-text">
              <span>Current Queue</span>
              <h4>24 People</h4>
            </div>
          </div>

          <div className="divider"></div>

          <div className="detail-item">
            <div className="icon-box">
              <FaClock />
            </div>
            <div className="detail-text">
              <span>Estimated Wait Time</span>
              <h4>25 Minutes</h4>
            </div>
          </div>
        </div>

        <div className="notification-box">
          You will receive notifications
          <br />
          when your turn approaches
        </div>

        <button className="confirm-btn">Confirm</button>

        <button className="back-btn">Back</button>
      </div>
    </>
  );
};

export default ConfirmQueue;