import React, { useState } from 'react';
import './App.css';

function App() {

  // Static array of data
  const dataArray = [
    { name: 'Jack Jackson', email: 'jackj@abc.com', password: 'jackj' },
    { name: 'Katie Kates', email: 'katieK@abc.com', password: 'katiek' },
    { name: 'Gen Glenns', email: 'gleng@abc.come', password: 'gleng' }
  ];

  const [customer, setCustomer] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    password: ''
  });

/* when clicking on customr in talbe, will either select them in bold 
  or deselect them*/
  const onCustomerClick = (selectedCustomer) => {
    if (customer != null && customer.name === selectedCustomer.name) {
      onCancelClick();
    } else {
      setCustomer(selectedCustomer);
      setCustomerData({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        password: selectedCustomer.password
      });
    }
  };

  // function for handling input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  /*these functions will display messages on the console depending 
  if the button selected is  Delete, Save, or Cancel */
  const onDeleteClick = () => {
    console.log('in onDeleteClick()');
  };

  const onSaveClick = () => {
    console.log('in onSaveClick()');
  };

  /* when click cancel button, deselects customer in table
    and clears input */
  const onCancelClick = () => {
    setCustomer(null);
    setCustomerData({
      name: '',
      email: '',
      password: ''
      });
  };

  const onCustomer = () => {
    console.log('in handleListClick');
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
            {dataArray.map((customerItem, index) => (
              <tr key={index} onClick={() => onCustomerClick(customerItem)}
              style={{fontWeight: customer && customer.name === customerItem.name ? 'bold': 'normal'}}>
                <td>{customerItem.name}</td>
                <td>{customerItem.email}</td>
                <td>{customerItem.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='customer_form'>
        <h5> Update</h5>
        <form className="p-3">
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
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
              name="pass"
              value={customerData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="buttons-container">
            <button type="button" onClick={onDeleteClick}>Delete</button>
            <button type="button" onClick={onSaveClick}>Save</button>
            <button type="button" onClick = {onCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
