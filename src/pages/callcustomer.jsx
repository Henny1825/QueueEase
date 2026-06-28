import React from "react";

const CallCustomer = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #dffcf8;
        }

        .call-page {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          background: #17172b;
          color: white;
          padding: 30px 25px;
        }

        .logo {
          text-align: center;
          color: #20c7b5;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 70px;
        }

        .menu-item {
          padding: 18px;
          margin-bottom: 18px;
          border-radius: 8px;
          font-weight: bold;
        }

        .menu-item.active {
          background: #35aaa0;
        }

        .logout {
          margin-top: 130px;
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
          padding: 0 60px;
          gap: 25px;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ddd;
        }

        .content {
          padding: 20px 45px;
        }

        .success {
          background: #35aaa0;
          color: white;
          padding: 22px 35px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 25px;
        }

        .check {
          background: white;
          color: #35aaa0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 25px;
        }

        .card {
          background: white;
          border-radius: 8px;
          padding: 28px;
        }

        .big {
          font-size: 45px;
          font-weight: bold;
        }

        .green {
          color: #35aaa0;
        }

        .small {
          margin-top: 18px;
          color: #555;
          font-size: 14px;
        }

        .middle {
          display: grid;
          grid-template-columns: 1.2fr 1.6fr 0.9fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          font-size: 14px;
        }

        th, td {
          padding: 8px;
          text-align: left;
        }

        .active-row {
          background: #ccf5ef;
        }

        .view {
          text-align: center;
          margin-top: 25px;
          color: #555;
        }

        .progress-top {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
        }

        .line {
          display: flex;
          align-items: center;
          margin-top: 30px;
        }

        .dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #05d66b;
        }

        .dot.current {
          background: #35aaa0;
        }

        .dot.upcoming {
          background: #ddd;
        }

        .bar {
          flex: 1;
          height: 3px;
          background: #35aaa0;
        }

        .labels {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 12px;
        }

        .actions button {
          width: 100%;
          padding: 16px;
          margin-top: 13px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
        }

        .call-btn {
        background: #35aaa0;
          color: white;
          border: none;
        }

        .outline-btn {
          background: white;
          border: 1px solid #35aaa0;
        }

        .bottom {
          background: #d9ffe6;
          padding: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 4px;
        }

        .notify-row {
          display: flex;
          gap: 20px;
          margin-top: 18px;
        }

        .sent {
          color: #00d66b;
          margin-left: 40px;
        }

        .time {
          margin-top: 28px;
          font-weight: bold;
          font-size: 18px;
        }

        @media (max-width: 900px) {
          .call-page {
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
        }
      `}</style>

      <div className="call-page">
        <aside className="sidebar">
          <div className="logo">QUEUEEASE</div>

          <div className="menu-item">Dashboard</div>
          <div className="menu-item active">Live Queue</div>
          <div className="menu-item">Customer</div>
          <div className="menu-item">Analytics</div>
          <div className="menu-item">Notification</div>
          <div className="menu-item">Service</div>
          <div className="menu-item">Settings</div>
          <div className="menu-item logout">Logout</div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div>🔔</div>

            <div className="profile">
              <div className="avatar"></div>
              <div>
                <strong>Admin User</strong>
                <p>Queue Officer</p>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="success">
              <div className="check">✓</div>
              <div>
                <h2>Customer Called Successfully</h2>
                <p>A-025 has been called to counter 3</p>
              </div>
            </div>

            <div className="cards">
              <div className="card">
                <h4>CURRENTLY SERVING</h4>
                <div className="big green">A-024</div>
                <p className="small">At Counter 3 &nbsp; Since 10:35 AM</p>
              </div>

              <div className="card">
                <h4>WAITING CUSTOMER</h4>
                <div className="big">24</div>
                <p className="small">People in queue</p>
              </div>

              <div className="card">
                <h4>AVERAGE WAIT TIME</h4>
                <div className="big">18 mins</div>
                <p className="small">1 Customer every 2 mins</p>
              </div>
            </div>

            <div className="middle">
              <div className="card">
                <h2>Queue Line</h2>

                <table>
                  <thead>
                    <tr>
                      <th>Joined at</th>
                      <th>Position</th>
                      <th>Ticket Number</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="active-row">
                      <td>1</td>
                      <td>A-025</td>
                      <td>10:36AM</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>A-026</td>
                      <td>10:37AM</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>A-027</td>
                      <td>10:38AM</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>A-028</td>
                      <td>10:39AM</td>
                    </tr>
                  </tbody>
                </table>

                <p className="view">View All (20)</p>
              </div>
              <div className="card">
                <h2>Queue Progress</h2>

                <div className="progress-top">
                  <div>
                    <p>Total in Queue</p>
                    <h2>25</h2>
                  </div>
                  <div>
                    <p>Now Serving</p>
                    <h2>A-024</h2>
                  </div>
                </div>

                <div className="line">
                  <div className="dot"></div>
                  <div className="bar"></div>
                  <div className="dot"></div>
                  <div className="bar"></div>
                  <div className="dot"></div>
                  <div className="bar"></div>
                  <div className="dot"></div>
                  <div className="bar"></div>
                  <div className="dot current"></div>
                  <div className="bar"></div>
                  <div className="dot upcoming"></div>
                  <div className="bar"></div>
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
              </div>

              <div className="card actions">
                <h2>ACTIONS</h2>
                <button className="call-btn">Call Next</button>
                <button className="outline-btn">Skip Customer</button>
                <button className="outline-btn">Pause Queue</button>
              </div>
            </div>

            <div className="bottom">
              <div>
                <h4>NOTIFICATIONS SENT</h4>
                <div className="notify-row">
                  <span>WhatsApp</span>
                  <span className="sent">Sent Successfully</span>
                </div>
                <div className="notify-row">
                  <span>SMS</span>
                  <span className="sent">Sent Successfully</span>
                </div>
              </div>

              <div>
                <h4>TIME</h4>
                <p className="time">10:42 AM</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default CallCustomer;