import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleBoardFlag ,clearUserState} from "../../store/slices/header";
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
      dispatch(clearUserState())
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      navigate("/");
      return;
    }
    return;
  };
  const buyPremium = async () => {
    try {
      const response = await axios.get("http://localhost:4000/buy-premium", {
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
      });
      console.log(response);
      const options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async (response) => {
          await axios.post(
            "http://localhost:4000/update-order-status",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: userToken,
              },
            }
          );
          alert("Payment success");
        },
      };

      // const rzp = new Razorpay(options);
      // rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again later.");
    }
  };
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
