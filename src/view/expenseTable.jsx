import React, {useEffect, useState} from 'react';
import HomePage from "./homePage";
import {Button, CloseButton, FormControl, FormLabel, Modal, Table} from "react-bootstrap";
import axios from "axios";


function ExpenseTable () {
    const [Expenses, setExpenses] = useState([]);
    const [changeNameModal , setChangeNameModal]  = useState(false);
    const [changeAmountModal , setChangeAmountModal]  = useState(false);
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
    const handleChangeName = (ID) => {
    setChangeNameModal(true);
    setSelectedID(ID)
}
    /**
     * handles the change amount modal to either open or close when clicked
     */
const handleChangeAmount = (expense) => {
        setChangeAmountModal(true);
        setSelectedID(expense)
    }

    const UpdateExpenseName  = ( expenseName) =>{
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
    }

    return (
        <div>
        <Table>
            <thead>
            <tr>
                <th>Expense Name</th>
                <th>Expense Amount $$</th>
            </tr>
            </thead>
            <tbody>

                {Expenses.map((expense) => (
                    <tr key={expense.id}>
                    <td>{expense.name}<Button style={{display:"flex", bottom:"30px",
                        marginRight:"400px", marginLeft:"auto"}} onClick={() => handleChangeName(expense)}>change name</Button></td>
                    <td>{expense.amount}<Button style={{display:"flex",
                    marginRight:"400px", marginLeft:"auto"}} onClick={() => handleChangeAmount(expense)}>change amount</Button></td>

                    </tr>
                    ))}

            </tbody>
        </Table>

            {/*this modal handles the change in either Expense name*/}
            <Modal show={changeNameModal} onHide={() => setChangeNameModal(false)}>
                <Modal.Title>
                    Edit the Expense name.
                    <CloseButton style={{paddingRight: "940px",position: "relative", bottom: "35px"}} onClick={() => setChangeNameModal(false)} />
                </Modal.Title>
                <Modal.Body>
                    <FormLabel>would you like to change the name?</FormLabel>
                    <FormControl placeholder="new name" value={newExpenseName} onChange={(event) =>setnewExpenseName(event.target.value)}></FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => UpdateExpenseName(newExpenseName)}>submit</Button>
                </Modal.Footer>
            </Modal>

            {/*this modal handles the change in either Expense amount*/}
            <Modal show={changeAmountModal} onHide={() => setChangeAmountModal(false)}>
                <Modal.Title>
                    Edit the Expense amount.
                    <CloseButton style={{paddingRight: "940px",position: "relative", bottom: "35px"}} onClick={() => setChangeAmountModal(false)} />
                </Modal.Title>
                <Modal.Body>
                    <FormLabel>would you like to change the amount?</FormLabel>
                    <FormControl placeholder="new amount" value={newExpenseAmount} onChange={(event) =>setnewExpenseAmount(event.target.value)}></FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => UpdateExpenseAmount(newExpenseAmount)}>submit</Button>
                </Modal.Footer>
            </Modal>


        </div>
    )

}

export default ExpenseTable;