const sequelize = require ('../db/connection');

const Expense = require ('../models/expense');
const User = require ('../models/signup');
//m-get => /premium-leaderboard
const leaderboard = async (req, res, next) => {
  console.log ('leader board controller');
  try {
    const users = await User.findAll ({
      attributes: [
        'id',
        'name',
        [
          sequelize.fn ('SUM', sequelize.col ('Expenses.amount')),
          'totalExpenseAmount',
        ],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ['User.id', 'User.name'],

      order: [[sequelize.literal ('totalExpenseAmount'), 'DESC']],
    });

    res.json (users);
  } catch (err) {
    console.log ('leaderboard');
    console.log (err.message);
    res.send ({message: 'error'});
  }
};
module.exports = {leaderboard};
