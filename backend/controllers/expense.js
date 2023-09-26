const Expense = require ('../models/expense');
const User = require ('../models/signup');

//m- post=>add-expense/:userId
const addExpense = async (req, res) => {
  try {
    const {userId} = req.params;
    const input = req.body;
    const createdData = await Expense.create ({...input, userId});
    console.log ('added');
    res.send (createdData);
  } catch (error) {
    console.log (error);
    res.json ({error: 'some thing went wrong'});
  }
};

// m-get => get-expense/:userId
const getExpense = async (req, res) => {
  try {
    const {userId} = req.params;
    const data = await Expense.findAll ({where: {userId}});
    res.send (data);
  } catch (error) {
    res.send ({error: 'something went wrong in getting data'});
  }
};
//m-delete =>delete-expense/:expenseId
const deleteExpense = async (req, res) => {
  try {
    const {expenseId} = req.params;
    const deletedData = await Expense.destroy ({where: {id: expenseId}});
    console.log (deletedData);
    // res.redirect ('/get-expense');
    res.send ({message: 'success'});
  } catch (error) {
    res.send ({error: error.message});
  }
};
//m-put =>update-expense/:expenseId
const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    console.log ({expenseId});
    const updatedData = req.body;
    console.log (updatedData);
    const [count] = await Expense.update (updatedData, {
      // array will be returned
      where: {id: expenseId},
    });
    console.log ({count});

    if (count === 0) {
      // If no rows were updated, it likely means the expense with the given ID doesn't exist.
      res.status (404).send ({error: 'Expense not found'});
    } else {
      res.send ({message: 'success'});
    }
  } catch (error) {
    console.log (error);
    res.send ({error: error.message});
  }
};
module.exports = {addExpense, getExpense, deleteExpense, updateExpense};
