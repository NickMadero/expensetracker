const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path')
const dbcontroller = require('./dbController')
const {storeExpense} = require('./addExpenses')
// initialize the Express app
const app = express();

// enable CORS security headers
app.use(cors());

// add an Express method to parse the POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add a new expense to the database.
app.post('/api/add-expense',async (req,res) =>{
    const { expense_name, expense_amount } = req.body;
    try {
        const result = await storeExpense(expense_name,expense_amount);
        res.status(200).json({ success: true, message: 'Appointment stored successfully', data: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error storing appointment' });
    }
})

// this endpoint will just call the stored procedure directly
app.post('/api/show-all-expense',(req,res) =>{
    const showExpense = "call show_all_expense();";
    dbcontroller.query(showExpense,(err,result) =>{
        if (err) {
            console.log(err);

        }else {
            console.log("all expenses should be shown")
        }
    })
})
// add a port to expose the API when the server is running
app.listen('3002', () => { })