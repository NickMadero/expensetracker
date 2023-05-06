import React, {useState} from 'react';
import {Button, Col, Form, Nav, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function HomePage () {
const [newExpense, setNewExpense] = useState('');
const [newAmount, setNewAmount] = useState('');

const addExpenses = (expenseName, expenseAmount) => {
    /**
     * todo create function that calls endpoint that will add an expense.
     */
        axios.post('/api/add-expense',{expense_name : expenseName, expense_amount : expenseAmount})
            .then(response => {
                setExpenses(response.data);

            })
            .catch(error => {
                console.log(error);
            });
    window.alert(`You're expense ${expenseName} has been added.`)
    window.location.reload();

    }



    return (
        <div>
            <h1>Expense entry</h1>
        <Form style={{
            width: '50%',
            margin: '0 auto',
            border: '1px solid black',
            padding: '20px'
        }}>

                    <Form.Group>
                        <Form.Label style={{"paddingRight": "800px"}}>Enter Expense</Form.Label>
                        <Form.Control name= "expense_name" placeholder="expense name"  value={newExpense} onChange={(event) => setNewExpense(event.target.value) }></Form.Control>
                    </Form.Group>
                     <Form.Group>
                      <Form.Label style={{"paddingRight": "800px"}}>Enter Expense</Form.Label>
                        <Form.Control name= "expense_amount" placeholder="expense amount"  value={newAmount} onChange={(event) => setNewAmount(event.target.value)}></Form.Control>
                     </Form.Group>
            <Button style={{"marginTop": "10px"}} onClick={() => addExpenses(newExpense,newAmount)}>Add Expense</Button>
        </Form>

        </div>


    )
}
export default HomePage;