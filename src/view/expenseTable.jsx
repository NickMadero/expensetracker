import React, {useEffect, useState} from 'react';
import HomePage from "./homePage";
import {Button, CloseButton, FormControl, FormLabel, Modal, Table} from "react-bootstrap";
import axios from "axios";


function ExpenseTable () {
    const [Expenses, setExpenses] = useState([]);
    const [changeModal , setChangeModal]  = useState(false);
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

const handleChangeClick = () => {
    setChangeModal(true);
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
                    <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>{expense.amount}<Button style={{display:"flex",
                    marginRight:"400px", marginLeft:"auto"}} onClick={() => handleChangeClick()}>change</Button></td>

                    </tr>
                    ))}

            </tbody>
        </Table>
            <Modal show={changeModal} onHide={() => setChangeModal(false)}>
                <Modal.Title>
                    Edit the Expense name or Expense amount.
                    <CloseButton onClick={() => setChangeModal(false)} />
                    <Modal.Body>
                        <FormLabel>would you like to change the name?</FormLabel>
                        <FormControl placeholder="new name"></FormControl>
                        <FormLabel>would you like to change the amount?</FormLabel>
                        <FormControl placeholder="new amount"></FormControl>
                    </Modal.Body>
                </Modal.Title>
            </Modal>
        </div>
    )

}

export default ExpenseTable;