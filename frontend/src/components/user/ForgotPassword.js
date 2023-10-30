import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/password/forgot-password",
        { email }
      );
      console.log(response.data);
      alert(response.data.message);
      setEmail("");
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col text-center text-secondary">
          <h2>Password Recovery Page</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-secondary">
          <div className="">
            <form onSubmit={handleSubmit} className="pt-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="email">Email:</label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center ">
                <div
                  className="signup  cursor-pointer text-primary"
                  onClick={() => navigate("/register")}>
                  Not registered yet? Register
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button type="submit" className="btn btn-primary mt-4 w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
