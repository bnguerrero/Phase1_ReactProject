import React, { useEffect, useState } from 'react';
import './App.css';
import * as memDB from './assets/memdb';

function App() {

  const [customers, setCustomers] = useState([]); // for list of all customers
  const [customer, setCustomer] = useState(null); //holds selected customer object
  const blankCustomer = {
    id: -1,
    name: '',
    email: '',
    password: ''
  }
  const [customerData, setCustomerData] = useState(blankCustomer); // form data for customer

  // returns all customers from memDB
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
    if (customer != null && customer.name === selectedCustomer.name) {
      clearForm(); // clear form if customer is already selected
    } else {
      // selects the clicked customer and fill form with its data
      setCustomer(selectedCustomer); 
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
    if (customer != null) {
      memDB.deleteById(customer.id);
      clearForm();
    }
  };

   // changes form mode if there is a customer selected or not
  const mode = customer == null? 'Add Customer' : 'Update Customer';
  
  const onSaveClick = () => {
    if (mode == 'Add Customer'){
      memDB.post(customerData);
    } else {
      memDB.put(customerData.id, customerData);
    }
    clearForm();
    setCustomers(memDB.getAll());
  };

  /* when click cancel button, deselects customer in table
    and clears input */
  const onCancelClick = () => {
    clearForm();
  };

  const clearForm = () => {
    setCustomer(null);
    setCustomerData(blankCustomer);
  };


  return (
    <div className='card-container'>
      <div className='customer_table'>
        <h5>Customer List</h5>
        <table>
          <thead>
            <tr>
              <th>Name </th>
              <th>Email </th>
              <th>Password </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customerItem, index) => (
              <tr key={index} onClick={() => onCustomerClick(customerItem)}
                style={{ fontWeight: customer && customer.name === customerItem.name ? 'bold' : 'normal' }}>
                <td>{customerItem.name}</td>
                <td>{customerItem.email}</td>
                <td>{customerItem.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='customer_form'>
        <h5> {mode}</h5>
        <form className="p-3">
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Customer Name"
              value={customerData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder= "name@company.com"
              value={customerData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Pass: </label>
            <input
              type="text"
              className="form-control"
              id="pass"
              name="password"
              placeholder="password"
              value={customerData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="buttons-container">
            <button type="button" onClick={onDeleteClick}>Delete</button>
            <button type="button" onClick={onSaveClick}>Save</button>
            <button type="button" onClick={onCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
