const dbcontroller = require("./dbcontroller");

/**
 *
 * @param expenseID
 * @param expenseAmount
 * @param expenseType
 * @returns {Promise<unknown>}
 * @constructor
 * this function will handle the query for updating the expense amount.
 */
async function UpdateExpenseAmount (expenseID, expenseAmount, expenseType) {
    const updateExpense = "call update_expense_amount(?,?,?)";
    return new Promise((resolve, reject) => {
        dbcontroller.query(updateExpense,
            [expenseID,expenseAmount,expenseType], (err, result) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(result);
                }
            });
    });
}

module.exports = {UpdateExpenseAmount};