import React, {useState} from 'react';
import HomePage from "./homePage";
import {Table} from "react-bootstrap";


function ExpenseTable () {
    const [Expenses, setExpenses] = useState([]);
    const ShowExpenses = () => {
        /**
         * todo create function that calls endpoint that will show an expense.
         */
    }

    return (
        <div>
        <Table>
            <thead>
            <tr>
                <th>Expense Name</th>
                <th>Expense Amount</th>
            </tr>
            </thead>
            <tbody>

                {Expenses.map((expense) => (
                    <tr>

                    </tr>
                    ))}

            </tbody>
        </Table>
        </div>
    )

}

export default ExpenseTable;