import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function Protected({ Component }) {
  const { userId } = useParams();
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
        id: userId,
        email,
      };
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      console.log(data);
      if (!data.verification) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  return (
    <>
      <Component />
    </>
  );
}
