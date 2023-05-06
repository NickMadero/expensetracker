import logo from './logo.svg';
import './App.css';

import HomePage from "./view/homePage";
import ExpenseTable from "./view/expenseTable";
function App() {
  return (
    <div className="App">

        <HomePage />
        <ExpenseTable />

    </div>
  );
}

export default App;
