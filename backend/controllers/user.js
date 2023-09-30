const Expense = require ('../models/expense');
const User = require ('../models/signup');

const leaderboard = async (req, res, next) => {
  console.log ('leader board controller');
  try {
    const users = await User.findAll ({
      include: [Expense], // Include the 'Expense' model to fetch associated posts
    });

    res.json (users);
  } catch (err) {
    console.log ('leaderboard');
    console.log (err);
  }
};
module.exports = {leaderboard};
