const dbcontroller = require('./dbcontroller')


 function GetCategoryType (category_type) {
     return new Promise((resolve, reject) => {
         const showCategoryType = "call get_category(?)";

         dbcontroller.query(showCategoryType, [category_type], (err, result) => {
             if (err) {
                 console.error(err);
                 reject(err);
             } else {
                 const sortedCategory = result[0].map((sorted) => ({
                     expenseID: sorted.expense_id,
                     name: sorted.expense_name,
                     amount: sorted.expense_amount,
                     categoryType: sorted.category_type,
                 }));
                 resolve(sortedCategory);
             }
         });
     });
 }

 module.exports = {GetCategoryType}