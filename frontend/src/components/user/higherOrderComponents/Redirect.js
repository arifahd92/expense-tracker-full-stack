import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Redirect({ Component }) {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const StringId = localStorage.getItem("userId");
  const email = localStorage.getItem("userEmail");
  console.log({userToken,StringId,email})
  let id;

  if (StringId) {
    id = JSON.parse(StringId) || null;
  }

  useEffect(() => {
    if (userToken && email && id) {
      // if credentials are saved verify
      verify();
    } else {
      //if credential are not save send on login page
      navigate("/");
    }
  }, []);
  //verify function
  const verify = async () => {
    try {
      console.log("verify called");
      const token = userToken;

      const apiUrl = "http://localhost:4000/verify-user";
      const requestData = {
        id,
        email,
      };
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log("from redirect");
      console.log(data);
      if (data.verification === true) {
        navigate(`/expense`);
      }
    } catch (error) {
      console.log("from verification");
      alert("Chect your internet and try again");
      console.log("from verification");
      if (!error.response.data.verification) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userToken");
        navigate("/");
      }
    }
  };
  return (
    <>
      <Component />
    </>
  );
}
