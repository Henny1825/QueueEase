import React from "react";
import {
  Search,
  Bell,
  ChevronRight,
  CreditCard,
  IdCard,
  Building2,
  Briefcase,
} from "lucide-react";

function ServiceSelection() {
  const services = [
    {
      title: "Passport Renewal",
      waiting: "24 People",
      time: "25 Mins",
      icon: <IdCard size={28} />,
    },
    {
      title: "Driving License",
      waiting: "14 People",
      time: "15 Mins",
      icon: <CreditCard size={28} />,
    },
    {
      title: "Tax Service",
      waiting: "6 People",
      time: "10 Mins",
      icon: <Building2 size={28} />,
    },
    {
      title: "Business Registration",
      waiting: "24 People",
      time: "25 Mins",
      icon: <Briefcase size={28} />,
    },
  ];

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Segoe UI',sans-serif;
        }

        body{
          background:#f7f7f7;
        }

        .page{
          max-width:430px;
          margin:auto;
          min-height:100vh;
          background:#fff;
          padding:24px;
        }

        .top-bar{
          display:flex;
          justify-content:flex-end;
          margin-bottom:20px;
        }

        .notification{
          cursor:pointer;
          color:#111827;
        }

        .logo{
          width:75px;
          margin-bottom:30px;
        }

        .heading h1{
          font-size:38px;
          color:#202235;
          margin-bottom:8px;
          font-weight:700;
        }

        .heading p{
          color:#6b7280;
          font-size:16px;
          margin-bottom:25px;
        }

        .search-box{
          display:flex;
          align-items:center;
          gap:12px;
          border:1px solid #e5e7eb;
          border-radius:12px;
          padding:15px;
          margin-bottom:25px;
        }

        .search-box input{
          border:none;
          outline:none;
          width:100%;
          font-size:15px;
        }

        .section-title{
          font-size:22px;
          font-weight:700;
          color:#202235;
          margin-bottom:15px;
        }

        .service-card{
          display:flex;
          align-items:center;
          justify-content:space-between;
          border:1px solid #e5e7eb;
          border-radius:14px;
          padding:16px;
          margin-bottom:16px;
          transition:0.3s;
          cursor:pointer;
        }

        .service-card:hover{
          transform:translateY(-2px);
          box-shadow:0 5px 15px rgba(0,0,0,0.08);
        }

        .service-left{
          display:flex;
          gap:15px;
          align-items:center;
        }

        .icon-box{
          width:60px;
          height:60px;
          background:#3BA79B;
          border-radius:16px;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
        }

        .service-info h3{
          font-size:18px;
          color:#202235;
          margin-bottom:10px;
        }

        .stats{
          display:flex;
          gap:25px;
        }

        .stats small{
          display:block;
          color:#9ca3af;
          margin-bottom:4px;
          font-size:11px;
        }

        .stats span{
          font-size:14px;
          color:#202235;
          font-weight:500;
        }

        .arrow{
          color:#202235;
        }

        .join-btn{
          width:100%;
          height:65px;
          border:none;
          border-radius:14px;
          background:#B8E0DA;
          color:#fff;
          font-size:24px;
          font-weight:700;
          margin-top:50px;
          cursor:pointer;
        }

        .join-btn:hover{
          opacity:0.9;
        }

        @media(max-width:480px){
          .heading h1{
            font-size:32px;
          }

          .service-info h3{
            font-size:16px;
          }

          .stats{
            gap:15px;
          }
        }
      `}</style>

      <div className="page">
        <div className="top-bar">
          <Bell size={24} className="notification" />
        </div>

        <img
          src="/logo.png"
          alt="QueueEase Logo"
          className="logo"
        />

        <div className="heading">
          <h1>Good Morning</h1>
          <p>What service would you like to access today?</p>
        </div>

        <div className="search-box">
          <Search size={20} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search for a service"
          />
        </div>

        <h2 className="section-title">
          Popular Services
        </h2>

        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-left">
              <div className="icon-box">
                {service.icon}
              </div>

              <div className="service-info">
                <h3>{service.title}</h3>

                <div className="stats">
                  <div>
                    <small>Currently Waiting</small>
                    <span>{service.waiting}</span>
                  </div>

                  <div>
                    <small>Average Wait</small>
                    <span>{service.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <ChevronRight
              size={22}
              className="arrow"
            />
          </div>
        ))}

        <button className="join-btn">
          Join Queue
        </button>
      </div>
    </>
  );
}

export default ServiceSelection;