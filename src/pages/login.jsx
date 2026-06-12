import React, { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://queue-ease-apis.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        alert("Login Successful");
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server connection failed");
    }
  };

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
          background:#e7f3f3;
        }

        .container{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:20px;
        }

        .card{
          background:#fff;
          max-width:1000px;
          width:100%;
          display:flex;
          gap:50px;
          padding:50px;
          border-radius:10px;
          box-shadow:0 10px 25px rgba(0,0,0,.08);
        }

        .left-section img{
          width:280px;
        }

        .right-section{
          flex:1;
        }

        .right-section h1{
          color:#1d2433;
          margin-bottom:10px;
        }

        .right-section p{
          color:#666;
          margin-bottom:25px;
        }

        label{
          display:block;
          margin-bottom:8px;
          font-weight:600;
        }

        input[type="text"],
        input[type="password"]{
          width:100%;
          height:48px;
          border:1px solid #ddd;
          border-radius:6px;
          padding:0 15px;
          margin-bottom:18px;
        }

        .password-box{
          position:relative;
        }

        .password-box i{
          position:absolute;
          right:15px;
          top:15px;
          cursor:pointer;
        }

        .options{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
          font-size:14px;
        }

        .remember{
          display:flex;
          align-items:center;
          gap:5px;
        }

        .options a{
          text-decoration:none;
          color:#3ab3a5;
        }

        button{
          width:100%;
          height:50px;
          border:none;
          border-radius:6px;
          background:#3ab3a5;
          color:white;
          cursor:pointer;
          font-size:16px;
        }

        .create-account{
          text-align:center;
          margin-top:20px;
        }

        .create-account a{
          text-decoration:none;
          color:#333;
          font-weight:600;
        }

        @media(max-width:768px){
          .card{
            flex-direction:column;
            gap:20px;
            padding:30px;
          }

          .left-section{
            text-align:center;
          }

          .left-section img{
            width:220px;
          }
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="left-section">
            <img
              src="/Frame 630266468_071020.png"
              alt="QueueEase"
            />
          </div>

          <div className="right-section">
            <h1>Welcome Back</h1>
            <p>Sign in to your admin account</p>

            <form onSubmit={handleSubmit}>
              <label>Email Address or Phone Number</label>

              <input
                type="text"
                placeholder="admin@queueease.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={togglePassword}
                ></i>
              </div>

              <div className="options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <a href="/">Forgot Password?</a>
              </div>

              <button type="submit">Login</button>

              <div className="create-account">
                <a href="/register">Create an Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
import Login from "./pages/login";

function App() {
  return <Login />;
}


