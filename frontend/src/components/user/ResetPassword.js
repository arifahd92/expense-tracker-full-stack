import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { reqId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== cnfPassword) {
        alert("confirm password did not match with password");
        return;
      }
      const response = await axios.post(
        "http://localhost:4000/password/update-password",
        { password, cnfPassword, reqId }
      );
      console.log(response.data);
      alert(response.data.message);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div>
      <div className="container mt-5   ">
        <div className="text-center text-white">
          <h2>Update Password</h2>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-white">
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Confirm Password:</label>
                <input
                  required
                  type="input"
                  className="form-control"
                  id="password"
                  name="password"
                  value={cnfPassword}
                  onChange={(e) => setCnfPassword(e.target.value)}
                  placeholder="Confirm password"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-4 w-100 ">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
