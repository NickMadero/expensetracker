const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path')
const dbcontroller = require('./dbController')
const {storeExpense} = require('./addExpenses')
const {UpdateExpenseName} = require('./updateExpenseName')
const {UpdateExpenseAmount} = require("./updateExpenseAmount");
const {DeleteExpense} = require("./deleteExpenses")
// initialize the Express app
const app = express();

// enable CORS security headers
app.use(cors());

// add an Express method to parse the POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add a new expense to the database.
app.post('/api/add-expense',async (req,res) =>{
    const { expense_name, expense_amount, category_type } = req.body;
    try {
        const result = await storeExpense(expense_name,expense_amount , category_type);
        res.status(200).json({ success: true, message: 'expense stored successfully', data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error storing expense' });
    }
})

app.post('/api/update-Expense-Name', async (req,res) =>{
    const { expense_id , expense_name} = req.body;

    try {
        const  result = await UpdateExpenseName(expense_id,expense_name);
        res.status(200).json({ success: true, message: 'expense name updated successfully', data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error updating expense name' });
    }

})

app.post('/api/update-Expense-amount', async (req,res) =>{
    const { expense_id , expense_amount} = req.body;

    try {
        const  result = await UpdateExpenseAmount(expense_id,expense_amount);
        res.status(200).json({ success: true, message: 'expense amount updated successfully', data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error updating expense amount' });
    }

})

// this endpoint will just call the stored procedure directly
app.post('/api/show-all-expense',(req,res) =>{
    const showExpense = "call show_all_expense();";
    dbcontroller.query(showExpense,(err,result) =>{
        if (err) {
            console.log(err);

        }else {
            console.log(result)
            const expense = result[0].map(expenses => ({
                expenseID : expenses.expense_id,
                name : expenses.expense_name,
                amount : expenses.expense_amount,
                categoryType: expenses.category_type,
                categoryID : expenses.category_id

            }));
            res.send(expense)
        }
    })
})

app.post('/api/delete-expense',(req,res) =>{
    const { category_id} = req.body;

    try{
      DeleteExpense(category_id);

    }
    catch (error){
        console.log("error in the backend")
    }
})

// add a port to expose the API when the server is running
app.listen('3002', () => { })