import React, {useState} from 'react';
import './App.css';
import customer_data from './assets/customer.json';
import CustomerTable from './components/CustomerTabe';
import AddCustomer from './components/AddCustomer';

function App() {
  const[customer, setCustomer] =useState([]);
  const addCustomer = (newCustomer) => {
    setCustomer([...CustomElementRegistry, newCustomer]);
  };
  return (
    <div className='card-container'>
      <CustomerTable data ={customer_data}/>
      <AddCustomer addCustomer = {addCustomer}/>
    </div>
  );
}

export default App;
