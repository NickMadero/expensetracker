import React, {useEffect, useState} from 'react';
import HomePage from "./homePage";
import {Button, CloseButton, Dropdown, DropdownButton, FormControl, FormLabel, Modal, Table} from "react-bootstrap";
import axios from "axios";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";


function ExpenseTable () {
    const [Expenses, setExpenses] = useState([]);
    const [removeExpenseModal , setremoveExpenseModal]  = useState(false);
    const [selectedID , setSelectedID] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
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

            axios.post('/api/get-category-list')
                .then(response => {
                    setCategoryList(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }, []);

    useEffect(() => {
        console.log(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        console.log(Expenses);
    }, [Expenses]);

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

    const sortCategory = async (selectedCategory) => {
            try {
                const response = await axios.post('/api/sort-category',{category_type: selectedCategory});
               setExpenses(response.data)
            } catch (e) {
                console.log(e)
            }
    }
    const handleOptionChange = async (eventKey) => {
        await setSelectedCategory(eventKey);
        sortCategory(eventKey);
    };

    return (
        <div>


            <Table>
            <thead>

            <tr>
                <th>Expense Name</th>
                <th>Expense Amount $$</th>
                <th >category type</th>
                <FormLabel>Select Category</FormLabel>
                <Dropdown onSelect={handleOptionChange}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-category">
                        Select a category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {categoryList.map((category) => (
                            <Dropdown.Item key={category} eventKey={category}>
                                {category}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
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