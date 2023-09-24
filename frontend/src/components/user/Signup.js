import React, { useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons"; // Import Bootstrap Icons

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mt-5  ">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
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

        <button type="submit" className="btn btn-primary mt-4 w-100 ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
