import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Redirect({ Component }) {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const StringId = localStorage.getItem("userId");
  const email = localStorage.getItem("userEmail");
  let id;

  if (StringId) {
    id = JSON.parse(StringId);
  }

  useEffect(() => {
    if (userToken && email && id) {
      verify();
    }
  }, []);
  //verify function
  const verify = async () => {
    try {
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
      const data = await response.data;
      console.log(data);
      if (data.verification) {
        navigate(`/expense`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Component />
    </>
  );
}
