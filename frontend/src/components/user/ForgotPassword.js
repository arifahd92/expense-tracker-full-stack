import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function ForgotPassword () {
  const [email, setEmail] = useState ('');
  const navigate = useNavigate ();
  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      const response = await axios.post (
        'http://localhost:4000/password/forgot-password',
        {email}
      );
      console.log (response.data);
      alert (response.data.message);
      setEmail ('');
      navigate ('/');
    } catch (error) {
      if (error.response) {
        alert (error.response.data.message);
        return;
      }
      alert (error.message);
    }
  };
  return (
    <div>

      <div className="container mt-5  ">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail (e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="d-flex justify-content-center text-primary">
            <div
              className="signup  border-bottom  cursor-pointer"
              onClick={() => navigate ('/register')}
            >
              Not registered yet? Register
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-100 ">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
