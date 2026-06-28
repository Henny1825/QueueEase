import React from "react";
import {
  FaBell,
  FaHome,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaClock,
  FaWhatsapp,
  FaSms,
  FaHeadphones,
  FaPlusSquare,
} from "react-icons/fa";

const LiveQueue = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
        }

        body {
          background: #dffcf8;
        }

        .page {
          display: flex;
          min-height: 100vh;
          background: #dffcf8;
        }

        .sidebar {
          width: 270px;
          background: #17182b;
          color: white;
          padding: 25px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .logo {
          text-align: center;
          color: #25b7a9;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 65px;
        }

        .logo span {
          display: block;
          font-size: 10px;
          color: #8ce6dc;
          margin-top: 4px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 18px 14px;
          border-radius: 8px;
          font-weight: 700;
          color: white;
        }

        .menu-item.active {
          background: #38aaa0;
        }

        .logout {
          display: flex;
          align-items: center;
          gap: 25px;
          font-weight: 700;
          padding: 18px 14px;
        }

        .main {
          flex: 1;
        }

        .topbar {
          height: 90px;
          background: white;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 70px;
          gap: 25px;
        }

        .bell {
          font-size: 28px;
          color: #17182b;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: linear-gradient(135deg, #dddddd, #34344d);
        }

        .profile h4 {
          color: #333344;
          font-size: 16px;
        }

        .profile p {
          color: #777777;
          font-size: 14px;
          margin-top: 4px;
        }

        .content {
          padding: 28px 42px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 35px;
        }

        .title h1 {
          color: #17182b;
          font-size: 34px;
          margin-bottom: 10px;
        }

        .title p {
          color: #4d4d5f;
          font-size: 21px;
        }

        .service-btn {
          background: white;
          border: 1px solid #dddddd;
          border-radius: 7px;
          padding: 14px 28px;
          font-weight: 700;
          color: #333344;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 25px;
        }

        .card {
          background: white;
          border-radius: 7px;
          padding: 26px;
        }

        .card-label {
          color: #444455;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .big-number {
          color: #343345;
          font-size: 44px;
          font-weight: 800;
        }

        .green {
          color: #35aaa0;
        }

        .card-footer {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          color: #444455;
          font-size: 13px;
        }

        .middle {
          display: grid;
          grid-template-columns: 1.1fr 1.45fr 0.85fr;
          gap: 15px;
          margin-bottom: 20px;
        }

        .section-title {
          color: #39394a;font-size: 18px;
          font-weight: 800;
          margin-bottom: 28px;
        }

        .queue-head {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          font-size: 13px;
          font-weight: 700;
          color: #3f3f50;
          margin-bottom: 16px;
        }

        .queue-bar {
          height: 27px;
          background: #cff8f2;
          border-radius: 4px;
        }

        .view-all {
          margin-top: 120px;
          text-align: center;
          color: #4d4d5f;
          font-size: 13px;
        }

        .progress-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .progress-top span {
          display: block;
          color: #555555;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .progress-top strong {
          font-size: 20px;
          color: #303044;
        }

        .timeline {
          display: flex;
          align-items: center;
          margin: 22px 0;
        }

        .dot-wrap {
          display: flex;
          align-items: center;
        }

        .dot {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          background: #0ee279;
        }

        .dot.current {
          background: #35aaa0;
        }

        .dot.upcoming {
          background: #dddddd;
        }

        .line {
          width: 45px;
          height: 3px;
          background: #35aaa0;
        }

        .labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #555555;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-top: 40px;
          font-size: 12px;
          color: #555555;
        }

        .legend span {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #0ee279;
          display: inline-block;
        }

        .legend-dot.current {
          background: #35aaa0;
        }

        .legend-dot.upcoming {
          background: #dddddd;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-btn {
          padding: 16px;
          border-radius: 7px;
          font-weight: 800;
          border: 1px solid #38aaa0;
          background: white;
          color: #222222;
          cursor: pointer;
        }

        .action-btn.primary {
          background: #38aaa0;
          color: white;
        }

        .bottom {
          background: white;
          border-radius: 7px;
          padding: 28px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
        }

        .activity-row {
          display: grid;
          grid-template-columns: 90px 80px 1fr;
          margin-bottom: 16px;
          font-size: 14px;
          color: #4d4d5f;
        }

        .activity-row strong {
          color: #343345;
        }

        .notify-box {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 30px;
        }

        .notify-item {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .notify-icon {
          font-size: 42px;
          color: #35aaa0;
        }

        .notify-item p {
          color: #777777;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .notify-item h2 {
          font-size: 30px;
          color: #343345;
        }

        @media (max-width: 900px) {
          .page {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
          }

          .cards,
          .middle,
          .bottom {
            grid-template-columns: 1fr;
          }

          .topbar {
            padding: 0 25px;
          }}
      `}</style>

      <div className="page">
        <aside className="sidebar">
          <div>
            <div className="logo">
              QUEUEEASE
              <span>Smart Queue Management</span>
            </div>

            <nav className="menu">
              <div className="menu-item">
                <FaHome /> Dashboard
              </div>

              <div className="menu-item active">
                <FaPlusSquare /> Live Queue
              </div>

              <div className="menu-item">
                <FaUsers /> Customer
              </div>

              <div className="menu-item">
                <FaChartBar /> Analytics
              </div>

              <div className="menu-item">
                <FaBell /> Notification
              </div>

              <div className="menu-item">
                <FaHeadphones /> Service
              </div>

              <div className="menu-item">
                <FaCog /> Settings
              </div>
            </nav>
          </div>

          <div className="logout">
            <FaSignOutAlt /> Logout
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <FaBell className="bell" />

            <div className="profile">
              <div className="avatar"></div>

              <div>
                <h4>Admin User</h4>
                <p>Queue Officer</p>
              </div>

              <span>⌄</span>
            </div>
          </header>

          <section className="content">
            <div className="header">
              <div className="title">
                <h1>Passport Renewal</h1>
                <p>Passport Service Center • Counter 3</p>
              </div>

              <button className="service-btn">Change Service ⌄</button>
            </div>

            <div className="cards">
              <div className="card">
                <div className="card-label">CURRENTLY SERVING</div>
                <div className="big-number green">A-024</div>

                <div className="card-footer">
                  <span>At Counter 3</span>
                  <span>Since 10:35 AM</span>
                </div>
              </div>

              <div className="card">
                <div className="card-label">WAITING CUSTOMER</div>
                <div className="big-number">24</div>

                <div className="card-footer">
                  <span>People in queue</span>
                  <FaUsers className="green" />
                </div>
              </div>

              <div className="card">
                <div className="card-label">AVERAGE WAIT TIME</div>
                <div className="big-number">18 mins</div>

                <div className="card-footer">
                  <span>1 Customer every 2 mins</span>
                  <FaClock className="green" />
                </div>
              </div>
            </div>

            <div className="middle">
              <div className="card">
                <div className="section-title">Queue Line</div>

                <div className="queue-head">
                  <span>Joined at</span>
                  <span>Position</span>
                  <span>Ticket Number</span>
                </div>

                <div className="queue-bar"></div>

                <div className="view-all">View All (20) ⌄</div>
              </div>

              <div className="card">
                <div className="section-title">Queue Progress</div>

                <div className="progress-top">
                  <div>
                    <span>Total in Queue</span>
                    <strong>25</strong>
                  </div>

                  <div>
                    <span>Now Serving</span>
                    <strong>A-024</strong>
                  </div>
                </div>

                <div className="timeline">
                  <div className="dot-wrap">
                    <div className="dot"></div>
                    <div className="line"></div>
                  </div><div className="dot-wrap">
                    <div className="dot"></div>
                    <div className="line"></div>
                  </div>

                  <div className="dot-wrap">
                    <div className="dot"></div>
                    <div className="line"></div>
                  </div>

                  <div className="dot-wrap">
                    <div className="dot"></div>
                    <div className="line"></div>
                  </div>

                  <div className="dot-wrap">
                    <div className="dot current"></div>
                    <div className="line"></div>
                  </div>

                  <div className="dot-wrap">
                    <div className="dot upcoming"></div>
                    <div className="line"></div>
                  </div>

                  <div className="dot upcoming"></div>
                </div>

                <div className="labels">
                  <span>A-020</span>
                  <span>A-021</span>
                  <span>A-022</span>
                  <span>A-023</span>
                  <span>A-024</span>
                  <span>A-025</span>
                  <span>A-026</span>
                </div>

                <div className="legend">
                  <span>
                    <i className="legend-dot"></i> Completed
                  </span>

                  <span>
                    <i className="legend-dot current"></i> Now Serving
                  </span>

                  <span>
                    <i className="legend-dot upcoming"></i> Upcoming
                  </span>
                </div>
              </div>

              <div className="card">
                <div className="section-title">ACTIONS</div>

                <div className="actions">
                  <button className="action-btn primary">Call Next</button>
                  <button className="action-btn">Skip Customer</button>
                  <button className="action-btn">Pause Queue</button>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div>
                <div className="card-label">
                  <b>LIVE ACTIVITY</b>
                </div>

                <div className="activity-row">
                  <span>10:35AM</span>
                  <strong>A-023</strong>
                  <span>Served</span>
                </div>

                <div className="activity-row">
                  <span>10:33AM</span>
                  <strong>A-022</strong>
                  <span>Served</span>
                </div>

                <div className="activity-row">
                  <span>10:31AM</span>
                  <strong>A-021</strong>
                  <span>Served</span>
                </div>
              </div>

              <div>
                <div className="card-label">
                  <b>NOTIFICATIONS (Today)</b>
                </div>

                <div className="notify-box">
                  <div className="notify-item">
                    <FaWhatsapp className="notify-icon" />

                    <div>
                      <p>WhatsApp Sent</p>
                      <h2>48</h2>
                    </div>
                  </div>

                  <div className="notify-item">
                    <FaSms className="notify-icon" />

                    <div>
                      <p>SMS Sent</p>
                      <h2>48</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default LiveQueue;