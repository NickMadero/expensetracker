import React, {useEffect, useState} from 'react';
import HomePage from "./homePage";
import {Button, CloseButton, FormControl, FormLabel, Modal, Table} from "react-bootstrap";
import axios from "axios";


function ExpenseTable () {
    const [Expenses, setExpenses] = useState([]);
    const [removeExpenseModal , setremoveExpenseModal]  = useState(false);
    const [newExpenseName, setnewExpenseName] = useState("");
    const [newExpenseAmount, setnewExpenseAmount] = useState("");
    const [selectedID , setSelectedID] = useState(null);
        /**
         * todo create function that calls endpoint that will show an expense.
         */
        useEffect(() => {
            axios.post('/api/show-all-expense')
                .then(response => {
                    setExpenses(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }, []);

    /**
     * handles the change name modal to either open or close when clicked
     */
    const handleRemoveExpense = (ID) => {
    setremoveExpenseModal(true);
    setSelectedID(ID)
}

    const deleteExpense = () => {
        axios.post('/api/delete-expense',{category_id:selectedID})
            .then(response =>{
                console.log(selectedID)
            })
    }

/*    const UpdateExpenseName  = ( expenseName) =>{
    console.log( selectedID.expenseID)
    axios.post('/api/update-Expense-Name', {expense_id : selectedID.expenseID, expense_name : expenseName})
        .then(response => {
            console.log( selectedID.expenseID,expenseName)
        })
        window.location.reload();
}
    const UpdateExpenseAmount  = ( expenseAmount) =>{
        console.log( selectedID.expenseID)
        axios.post('/api/update-Expense-amount', {expense_id : selectedID.expenseID, expense_amount : expenseAmount})
            .then(response => {
                console.log( selectedID.expenseID,expenseAmount)
            })
        window.location.reload();
    }*/


    return (
        <div>
        <Table>
            <thead>
            <tr>
                <th>Expense Name</th>
                <th>Expense Amount $$</th>
                <th>category type</th>
            </tr>
            </thead>
            <tbody>

                {Expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td><Button variant={"danger"} size={"sm"}
                       onClick={() =>handleRemoveExpense(expense.categoryID)} >remove</Button>{expense.name}</td>
                    <td>{expense.amount}{/*<Button style={{display:"flex",
                    marginRight:"400px", marginLeft:"auto"}} onClick={() => handleChangeAmount(expense)}>change amount</Button>*/}</td>
                    <td>{expense.categoryType}</td>
                    </tr>
                    ))}

            </tbody>
        </Table>

            {/*this modal handles the change in either Expense name*/}
            <Modal show={removeExpenseModal} onHide={() => setremoveExpenseModal(false)}>
                <Modal.Title>
                    would you like to remove this expense?
                    <CloseButton style={{paddingRight: "940px",position: "relative", bottom: "35px"}} onClick={() => setremoveExpenseModal(false)} />
                </Modal.Title>
                <Modal.Body>
                  <Button style={{marginLeft:"100px" , position:"relative" }} variant={"success"}
                 onClick={() =>deleteExpense()} >yes</Button>
                    <Button style={{marginLeft:"148px" , position:"relative" }} variant={"danger"}
                     onClick={() => setremoveExpenseModal(false)}>no</Button>
                </Modal.Body>

            </Modal>


        </div>
    )

}

export default ExpenseTable;