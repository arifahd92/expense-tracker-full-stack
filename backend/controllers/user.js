const Expense = require ('../models/expense');
const User = require ('../models/signup');

const leaderboard = async (req, res, next) => {
  console.log ('leader board controller');
  try {
    const users = await User.findAll ({
      include: [Expense], // Include the 'Expense' model to fetch associated posts
    }); /*
      .then (users => {
        // 'users' will contain all users, and each user will have an array of associated posts
        users.forEach (user => {
          console.log (`User: ${user.name}`);
          user.Expense.forEach (expense => {
            console.log (`  Post: ${expense.amount}`);
          });
        });
      })
      .catch (error => {
        console.error ('Error:', error);
      });
      */
 

    res.json (users);
  } catch (err) {
    console.log ('leaderboard');
    console.log (err);
  }
};
module.exports = {leaderboard};
