const express = require ('express');
const {
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
} = require ('../controllers/expense');
const router = express.Router ();
router.get ('/get-expense/:userId', getExpense);

router.post ('/add-expense/:userId', addExpense);

router.delete ('/delete-expense/:expenseId', deleteExpense);

router.put ('/update-expense/:expenseId', updateExpense);

module.exports = router;
