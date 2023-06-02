const dbController = require('../api/dbcontroller')

/**
 TODO: lets try to make a sort feature for the amount showing the highest amount to the lowest amount
 first maybe figure out how we can compare the first expense with the next expense
 then keep comparing till we have the largest.
 maybe a for loop will help.

 idea for later lets move the function to the backend so we can use the debugger
 */

function largestAmount(Expenses) {
    let largest = [Expenses[0].amount];
    let largestExpenses = [Expenses[0]];
    let otherExpenses = [];
    for (let i = 0; i < Expenses.length  ; i++) {
        if (Expenses[i].amount > largest) {
            largest = Expenses[i].amount;
            largestExpenses = [Expenses[i]];
        } else if (Expenses[i].amount === largest) {
            largestExpenses.push(Expenses[i]);

        } else {
            otherExpenses.push(Expenses[i])
        }
    }
                otherExpenses.sort((a,b) => b.amount - a.amount)
                largestExpenses = largestExpenses.concat(otherExpenses);
    return largestExpenses;
}


module.exports = {largestAmount};