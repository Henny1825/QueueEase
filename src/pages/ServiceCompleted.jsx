import {
  FaCheck,
  FaIdCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const ServiceCompleted = ({
  service,
  servedAt,
  completedDate,
  totalWaitMins,
  onJoinAnother,
  onReturnHome,
}) => {
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

        .success-section{
          text-align:center;
          margin-top:70px;
        }

        .success-icon{
          width:120px;
          height:120px;
          margin:auto;
          border-radius:50%;
          background:#DCE8DD;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .success-icon svg{
          font-size:55px;
          color:#2E7D32;
        }

        .title{
          color:#38A89D;
          font-size:24px;
          font-weight:700;
          margin-top:20px;
        }

        .subtitle{
          color:#666;
          margin-top:8px;
          font-size:15px;
        }

        .summary-card{
          background:#EEF2F2;
          border-radius:12px;
          padding:20px;
          margin-top:25px;
        }

        .summary-title{
          font-size:22px;
          font-weight:700;
          color:#222;
          margin-bottom:20px;
        }

        .row{
          display:flex;
          align-items:center;
          margin-bottom:20px;
        }

        .row:last-child{
          margin-bottom:0;
        }

        .row svg{
          color:#38A89D;
          font-size:18px;
          margin-right:15px;
          min-width:20px;
        }

        .label{
          width:130px;
          color:#666;
          font-size:15px;
        }

        .value{
          color:#222;
          font-size:15px;
          font-weight:500;
        }

        .join-btn{
          width:100%;
          height:55px;
          border:none;
          border-radius:10px;
          background:#38A89D;
          color:#fff;
          font-size:18px;
          font-weight:600;
          margin-top:35px;
          cursor:pointer;
        }

        .home-btn{
          width:100%;
          height:55px;
          border:1px solid #ff7b7b;
          border-radius:10px;
          background:#fff;
          color:#38A89D;
          font-size:18px;
          font-weight:600;
          margin-top:12px;
          cursor:pointer;
        }

        @media(max-width:768px){
          .success-icon{
            width:110px;
            height:110px;
          }

          .title{
            font-size:22px;
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

      <div className="page">

        <div className="success-section">

          <div className="success-icon">
            <FaCheck />
          </div>

          <h2 className="title">
            Service Completed
          </h2>

          <p className="subtitle">
            Thank you for using QueueEase
          </p>

        </div>

        <div className="summary-card">

          <div className="summary-title">
            Session Summary
          </div>

          <div className="row">
            <FaIdCard />
            <span className="label">Service</span>
            <span className="value">
              {service}
            </span>
          </div>

          <div className="row">
            <FaMapMarkerAlt />
            <span className="label">Serve at</span>
            <span className="value">
              {servedAt}
            </span>
          </div>

          <div className="row">
            <FaCalendarAlt />
            <span className="label">Date</span>
            <span className="value">
              {completedDate}
            </span>
          </div>

          <div className="row">
            <FaClock />
            <span className="label">
              Total Wait Time
            </span>
            <span className="value">
              {totalWaitMins} Minutes
            </span>
          </div>

        </div>

        <button className="join-btn" onClick={onJoinAnother}>
          Join Another Queue
        </button>

        <button className="home-btn" onClick={onReturnHome}>
          Return Home
        </button>

      </div>
    </>
  );
};

export default ServiceCompleted;