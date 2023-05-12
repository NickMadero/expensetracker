const dbcontroller = require("./dbcontroller");

/**
 *
 * @param expenseID
 * @param expenseAmount
 * @returns {Promise<unknown>}
 * @constructor
 * this function will handle the query for updating the expense amount.
 */
async function UpdateExpenseAmount (expenseID, expenseAmount) {
    const updateExpense = "call update_expense_amount(?,?)";
    return new Promise((resolve, reject) => {
        dbcontroller.query(updateExpense,
            [expenseID,expenseAmount], (err, result) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(result);
                }
            });
    });
}

module.exports = {UpdateExpenseAmount};