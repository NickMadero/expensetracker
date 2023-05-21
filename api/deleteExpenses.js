const dbcontroller = require("../api/dbcontroller")


/**
 * this function will call delete_expense stored procedure to make a deletion from the database.
 * @param categoryID
 * @constructor
 */
function DeleteExpense (categoryID) {
    const deleteExpense = "call delete_expense(?)";
    dbcontroller.query(deleteExpense,[categoryID],(err,result) => {
        if (err) {
            console.log(err);
        } else {
            return result
        }
    })
}

module.exports = {DeleteExpense};

