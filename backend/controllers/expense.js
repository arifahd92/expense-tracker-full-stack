const sequelize = require ('../db/connection');
const Expense = require ('../models/expense');
const User = require ('../models/user');

//m- post=>add-expense
const addExpense = async (req, res) => {
  console.log ('add expense controller');
  const t = await sequelize.transaction ();
  try {
    // const {userId} = req.params;
    const userId = req.userId;
    const input = req.body;
    const {amount} = req.body;
    const createdData = await Expense.create (
      {...input, userId},
      {transaction: t}
    );
    console.log ('added');
    const prevTotal = req.user.totalExpenseAmount;
    const currentTotal = +prevTotal + +amount;
    await req.user.update (
      {totalExpenseAmount: currentTotal},
      {transaction: t}
    );
    await t.commit ();
    res.send (createdData);
  } catch (error) {
    console.log (error);
    await t.rollback ();
    res.json ({error: 'some thing went wrong'});
  }
};

// m-get => get-expense
const getExpense = async (req, res) => {
  try {
    console.log ('getExpense controller');
    const userId = req.userId;
    const token = req.cookies.token;
    console.log ('token from cookie*********************', token);

    const premium = req.user.premium;
    console.log ({userId});

    const expenses = await Expense.findAll ({where: {userId}});

    res.json ({
      data: expenses,
      premium: premium,
      total: req.user.totalExpenseAmount,
    });
  } catch (error) {
    console.error (error.message);
    res.status (500).json ({error: 'Something went wrong in getting data'});
  }
};

//m-delete =>delete-expense/:expenseId
const deleteExpense = async (req, res) => {
  const t = await sequelize.transaction ();
  try {
    const {expenseId} = req.params;
    const expense = await Expense.findOne ({where: {id: expenseId}});
    const deletedData = await Expense.destroy (
      {where: {id: expenseId}},
      {transaction: t}
    );
    const prevTotal = req.user.totalExpenseAmount;
    const amount = expense.amount;
    const totalAmount = +prevTotal - +amount;
    await req.user.update ({totalExpenseAmount: totalAmount}, {transaction: t});
    console.log (deletedData);
    await t.commit ();
    res.send ({message: 'success'});
  } catch (error) {
    console.log (error.message);
    await t.rollback ();
    res.send ({error: error.message});
  }
};
//m-put =>update-expense/:expenseId
const updateExpense = async (req, res) => {
  console.log ('update expense contyroller');
  const t = await sequelize.transaction ();
  try {
    const expenseId = req.params.expenseId;
    console.log ({expenseId});
    const updatedData = req.body;
    const {amount: newAmount} = req.body; //7
    const expense = await Expense.findByPk (expenseId);
    const prevAmount = expense.amount; //say 5
    const difference = +newAmount - prevAmount;
    const updatedTotal = req.user.totalExpenseAmount + +difference;
    await req.user.update (
      {totalExpenseAmount: updatedTotal},
      {transaction: t}
    );
    console.log (updatedData);
    const [count] = await Expense.update (
      updatedData,
      {
        // array will be returned
        where: {id: expenseId},
      },
      {transaction: t}
    );
    console.log ({count});

    if (count === 0) {
      // If no rows were updated, it likely means the expense with the given ID doesn't exist.
      await t.rollback ();
      res.status (404).send ({error: 'Expense not found'});
    } else {
      await t.commit ();
      res.send ({message: 'success'});
    }
  } catch (error) {
    console.log (error.message);
    await t.rollback ();
    res.send ({error: error.message});
  }
};
module.exports = {addExpense, getExpense, deleteExpense, updateExpense};
