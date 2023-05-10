import React, {useEffect, useState} from 'react';
import HomePage from "./homePage";
import {Button, CloseButton, FormControl, FormLabel, Modal, Table} from "react-bootstrap";
import axios from "axios";


function ExpenseTable () {
    const [Expenses, setExpenses] = useState([]);
    const [changeNameModal , setChangeNameModal]  = useState(false);
    const [changeAmountModal , setChangeAmountModal]  = useState(false);
        /**
         * todo create function that calls endpoint that will show an expense.
         */
        useEffect(() => {
            axios.post('/api/show-all-expense')
                .then(response => {
                    setExpenses(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, []);

    /**
     * handles the change name modal to either open or close when clicked
     */
    const handleChangeName = () => {
    setChangeNameModal(true);
}
    /**
     * handles the change amount modal to either open or close when clicked
     */
const handleChangeAmount = () => {
        setChangeAmountModal(true);
    }

    const UpdateExpenseName  = (expenseID, expenseName) =>{
    axios.post('/api/update-Expense-Name', {expense_id : expenseID, expense_name : expenseName})
        .then(response => {
            console.log(expenseID,expenseName)
        })
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
                        marginRight:"400px", marginLeft:"auto"}} onClick={() => handleChangeName()}>change name</Button></td>
                    <td>{expense.amount}<Button style={{display:"flex",
                    marginRight:"400px", marginLeft:"auto"}} onClick={() => handleChangeAmount()}>change amount</Button></td>

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
                    <FormControl placeholder="new name"></FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => UpdateExpenseName(Expenses.id , Expenses.expense_name)}>submit</Button>
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
                    <FormControl placeholder="new amount"></FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button>submit</Button>
                </Modal.Footer>
            </Modal>


        </div>
    )

}

export default ExpenseTable;