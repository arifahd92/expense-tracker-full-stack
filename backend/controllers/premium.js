const sequelize = require ('../db/connection');

const Expense = require ('../models/expense');
const User = require ('../models/user');
//m-get => /premium-leaderboard
const leaderboard = async (req, res, next) => {
  console.log ('leader board controller');
  try {
    const users = await User.findAll ({
      attributes: [
        'id',
        'name',
        'totalExpenseAmount',
        /*
        [
          sequelize.fn ('SUM', sequelize.col ('Expenses.amount')),
          'totalExpenseAmount',
        ],
      ],
      include: [
        {
          model: Expense,
          attributes: [], // i just want use Expense model but dont want any field, mandatory for aggregation
        },
        */
      ],
      group: ['User.id'],

      order: [[sequelize.literal ('totalExpenseAmount'), 'DESC']],
    });

    res.json (users);
  } catch (err) {
    console.log ('leaderboard');
    console.log (err.message);
    res.send ({message: 'error'});
  }
  //for more optemization we can use an extra coloumn  (totalExpenseAmount) in User table and we will not have to use aggregate function of sequelize
};
module.exports = {leaderboard};
