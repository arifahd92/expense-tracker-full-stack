import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import  Razorpay  from "razorpay";
import { useDispatch, useSelector } from "react-redux";
import { toggleBoardFlag, clearUserState } from "../../store/slices/header";
import { clearExpenseState } from "../../store/slices/expense";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = localStorage.getItem("userEmail");
  const userToken = localStorage.getItem("userToken");
  const { boardFlag } = useSelector((state) => state.user);
  console.log({ boardFlag });
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure");
    if (confirm) {
      dispatch(clearExpenseState());
      dispatch(clearUserState());
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      navigate("/");
      return;
    }
    return;
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function buyPremium() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const userToken = localStorage.getItem("userToken");
    // creating a new order
    const result = await axios.get("http://localhost:4000/buy-premium", {
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_Xkhis8ORygYj16", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Arif corp",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        // this will be called on success payment
        const result = await axios.post(
          "http://localhost:4000/payment-success",
          data,
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        console.log({ result });
        alert(result.data.message);
      },
      prefill: {
        name: "md arif",
        email: "arifahd92@gmail.com",
        contact: "7275890926",
      },
      notes: {
        address: " Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <div className="container  container-sm mt-5 w-sm-75">
        <div className="row   ">
          <div className="col text-warning  ">{userEmail}</div>

          <div className="col">
            <button
              className="btn btn-warning  float-end mb-1"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col  ">
            <button
              className=" btn btn-outline-primary   "
              onClick={buyPremium}
            >
              buy premium
            </button>
          </div>
          <div className="col">
            <button
              className=" btn btn-outline-primary float-end mt-1   "
              onClick={() => dispatch(toggleBoardFlag())}
            >
              {boardFlag ? "hide leader board" : " show leader board"}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
