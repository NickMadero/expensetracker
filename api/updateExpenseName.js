const dbcontroller = require("../api/dbcontroller")

/**
 * this function calls a stored procedure then returns the data back to index.js
 * @param expenseName
 * @param expenseAmount
 * @returns {Promise<unknown>}
 */
async function UpdateExpenseName (expenseID, expenseName) {
    const updateExpense = "call update_expense_name(?,?)";
    return new Promise((resolve, reject) => {
        dbcontroller.query(updateExpense,
            [expenseID,expenseName], (err, result) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(result);
                }
            });
    });
}

module.exports = {UpdateExpenseName};