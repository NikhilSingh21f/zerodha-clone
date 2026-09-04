import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
       "https://zerodha-backend-r60u.onrender.com/login",
        //"http://127.0.0.1:3002/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Login response:", response.data);
      alert(response.data.message);
      window.location.replace("http://localhost:3001/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else if (error.request) {
        alert("Backend server is not responding. Please check port 3002.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const goToSignup = () => {
    window.location.href = "/signup";
  };
  return (
    <div className="signup-page">
      <section className="signup-hero mt-5 p-5">
        <div className="container">
          <h3 className="text-center main-title mb-3 p-2 mt-5">
            Open a free demat and trading account online
          </h3>
          <p className="text-center main-subtitle mb-5 text-muted fs-5">
            Start investing in brokerage free and join a community of
            1.6+ crore investors and traders
          </p>
          <div className="row align-items-center signup-content p-5 mt-5">
            <div className="col-lg-6 col-md-6 mx-auto text-center">
              <div className="signup-image">
                <img
                  src="/media/signup.png"
                  alt="Signup illustration"
                  className="img-fluid w-85 mx-auto d-block"
                />
              </div>
            </div>
            <div className="col-lg-1"></div>

            <div className="col-lg-5">
              <div className="signup-form">
                <h3>Login</h3>
                <p className="abc text-muted fs-5">
                  Or track your existing application
                </p>
                <form onSubmit={handleLogin}>
                  <div className="mb-2 p-2">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-2 p-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary signup-button w-50 mt-2"
                  >
                    Login
                  </button>
                </form>
                <p className="abc mt-3">
                  Don't have an account?
                  <button
                    type="button"
                    onClick={goToSignup}
                    className="btn btn-link text-decoration-none p-2"
                  >
                    Signup
                  </button>
                </p>
              </div>
              <p className="terms text-deco mt-4 fs-6">
                By proceeding, you agree to the Zerodha{" "}
                <a href="#" className="text-decoration-none">
                  terms & policy
                </a>
              </p>
              <hr />
              <p className="nri-link fs-6">
                Looking to open an NRI account?{" "}
                <a href="#" className="text-decoration-none">
                  Click here
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="existing-account">
        <div className="container text-center">
          <h3>Already have a demat account?</h3>
          <p className="abc text-muted mt-3 mb-5 p-3">
            Move your holdings to Zerodha and we'll cover your transfer
            costs, up to ₹500.{" "}
            <a href="#" className="text-decoration-none">
              Learn more.
            </a>
          </p>
        </div>
      </section>
      <section className="investment-section">
        <div className="container">
          <h3 className="section-title text-center text-muted mb-5">
            Investment options with Zerodha demat account
          </h3>
          <div className="row investment-row">
            <Investment
              image="/media/stocks.svg"
              title="Stocks"
              description="Invest in all exchange-listed securities"
            />
            <Investment
              image="/media/mf.svg"
              title="Mutual funds"
              description="Invest in commission-free direct mutual funds"
            />
            <Investment
              image="/media/ipo.svg"
              title="IPO"
              description="Apply to the latest IPOs instantly via UPI"
            />
            <Investment
              image="/media/fo.svg"
              title="Futures & options"
              description="Hedge and mitigate market risk through simplified F&O trading"
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary signup-button w-25 mt-5 mb-5">
              Explore Investments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
const Investment = ({ image, title, description }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="investment-card d-flex align-items-center p-3">
        <div
          className="investment-icon me-4 flex-shrink-0"
          style={{ width: "140px" }}
        >
          <img
            src={image}
            alt={title}
            className="img-fluid"
            style={{ maxHeight: "100px" }}
          />
        </div>
        <div>
          <h5 className="mb-2">
            {title}
          </h5>
          <p className="text-muted mb-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;