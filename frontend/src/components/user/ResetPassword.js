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
  };
  return (
    <div>
      <div className="container mt-5  ">
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
              required
              type="input"
              className="form-control"
              id="password"
              name="password"
              value={cnfPassword}
              onChange={(e) => setCnfPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-100 ">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}