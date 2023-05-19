const dbcontroller = require("../api/dbcontroller")

/**
 * this function calls a stored procedure then returns the data back to index.js
 * @param expenseName
 * @param expenseAmount
 * @returns {Promise<unknown>}
 */
async function storeExpense (expenseName, expenseAmount,categoryType) {
    const addExpense = "call add_expense(?,?,?)";
    return new Promise((resolve, reject) => {
        dbcontroller.query(addExpense,
            [expenseName,expenseAmount,categoryType], (err, result) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(result);
                }
            });
    });
}

module.exports = {storeExpense};