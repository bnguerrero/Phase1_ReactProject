import React, { useEffect, useState } from 'react';
import './App.css';
import * as memDB from './assets/memdb';
import CustomerList from './components/CustomerList';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';

function App() {

  const [customers, setCustomers] = useState([]);
  const blankCustomer = {
    id: -1,
    name: '',
    email: '',
    password: ''
  }

  //FORM OBJECT
  const [customerData, setCustomerData] = useState(blankCustomer);

  const getCustomers = function () {
    console.log('in getCustomers()');
    const allCustomers = memDB.getAll();
    setCustomers(allCustomers);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  /* when clicking on customer in talbe, will either select them in bold 
    or deselect them*/
  const onCustomerClick = (selectedCustomer) => {
    if (customerData != null && customerData.name === selectedCustomer.name) {
      setCustomerData(blankCustomer);
    } else {
      setCustomerData({
        id: selectedCustomer.id,
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        password: selectedCustomer.password
      });
    }
  };

  // function for handling input changes in the form
  const handleInputChange = (e) => {
    console.log('in handleInputChange()');
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  /*these functions will display messages on the console depending 
  if the button selected is  Delete, Save, or Cancel */
  const onDeleteClick = () => {
    if (customerData != null) {
      memDB.deleteById(customerData.id);
      setCustomerData(blankCustomer);
      setCustomers(memDB.getAll());
    }
  };

  const onSaveClick = () => {
    if (mode === 'Add Customer') {
      memDB.post(customerData);
    } else {
      memDB.put(customerData.id, customerData);
    }
    setCustomerData(blankCustomer);
    setCustomers(memDB.getAll());
  };

  /* when click cancel button, deselects customer in table
    and clears input */
  const onCancelClick = () => {
    setCustomerData(blankCustomer);

  };


  // changes form mode if there is a customer selected or not
  const mode = customerData.id === -1 ? 'Add Customer' : 'Update Customer';


  return (
    <div className='card-container'>
      <CustomerList 
        data={customers}
        selectedCustomer={customerData}
        onCustomerClick={onCustomerClick}
      />

      <CustomerAddUpdateForm 
        customerData={customerData}
        handleInputChange={handleInputChange}
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
        onCancelClick={onCancelClick}
        mode={mode}
      />


    </div>
  );
}

export default App;