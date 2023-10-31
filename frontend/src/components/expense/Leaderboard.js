import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Leaderboard() {
  const userToken = localStorage.getItem("userToken");
  const [users, setUsers] = useState([]);
  const { darkFlag } = useSelector((state) => state.user);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/premium/leader-board",
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        const users = response.data;
        console.log("from leaderboard");
        //getting sorted and grouped data
        console.log(users);
        setUsers(users);
        /*
        //with bad query at backend***********
        const totalAmountArr = [];
        users.forEach (element => {
          let sum = 0;
          element.expenses.forEach (expense => {
            sum += +expense.amount;
          });
          totalAmountArr.push (sum);
        });
        console.log (totalAmountArr);

        let updatedUser = [];

        for (let i = 0; i < users.length; i++) {
          const dummy = {...users[i], total: totalAmountArr[i]};

          updatedUser = [...updatedUser, dummy];
        }
        updatedUser.sort ((a, b) => b.total - a.total);
        setUsers (updatedUser);
        */
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchUser();
  }, []);
  return (
    <div
      className={`leaderboardContainer border  ${
        darkFlag && "bg-black text-info"
      } `}
      style={{
        position: "absolute",
        minHeight: "80vh",
        width: "100vw",
        top: "100px",
        zIndex: 5,
        backgroundColor: "GrayText",
      }}>
      <div
        className={`container ${darkFlag && "bg-black text-black"} mt-4`}
        style={{ minHeight: "calc(100vh - 100px)" }}>
        <div className="row  border-bottom-5 ">
          <h4 className=" d-flex justify-content-center bg-info bg-secondary-subtle p-2 ">
            LEADER BOARD
          </h4>
        </div>
        <div className="row bg-body-secondary p-2 mb-2">
          <div className="col">
            <h6>Rank</h6>
          </div>
          <div className="col d-flex justify-content-center">
            <h6>User Name</h6>
          </div>
          <div className="col d-flex justify-content-end ">
            <h6>Total Expense</h6>
          </div>
        </div>

        {users.length > 0 &&
          users.map((user, ind) => {
            return (
              <div
                key={user.id}
                className={`row bg-body-tertiary border mb-2 p-2 ${
                  ind <= 2 && "text-info"
                }`}>
                <div className="col  "># {ind + 1}</div>
                <div className="col d-flex justify-content-center ">
                  {user.name}
                </div>
                <div className="col d-flex justify-content-end ">
                  {user.totalExpenseAmount} $
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
