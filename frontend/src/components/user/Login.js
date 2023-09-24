import React, { useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons"; // Import Bootstrap Icons
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        formData
      );

      if (response.status !== 200) {
        alert("Something went wrong");
        return;
      }
      console.log(response);
      
    } catch (err) {
      console.log(err.response.data.error);
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <div className="container mt-3 d-flex justify-content-center">
        <h3 className="text-secondary">login</h3>
      </div>
      <div className="container mt-5  ">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              required
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="input-group">
              <input
                required
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div className="input-group-append border">
                <button
                  className="btn btn-outline-none"
                  type="button"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center text-primary">
            <div
              className="signup  border-bottom  cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Not registered yet? Register
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-100 ">
            submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;