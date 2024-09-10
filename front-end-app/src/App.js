import React, {useState} from 'react';
import './App.css';

function App() {
 
  // Static array of data
  const dataArray = [
    { name: 'Jack Jackson', email: 'jackj@abc.com' , password: 'jackj'},
    { name: 'Katie Kates', email: 'katieK@abc.com', password: 'katiek' },
    { name: 'Gen Glenns', email: 'gleng@abc.come', password: 'gleng' }
  ];

  /*these functions will display messages on the console depending 
  if the button selected is  Delete, Save, or Cancel */
  const onDeleteClick = () => {
    console.log('in onDeleteClick()');
  };

  const onSaveClick = () => {
    console.log('in onSaveClick()');
  };
    
  const onCancelClick = () => {
    console.log('in onCancelClick()');
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
              {dataArray.map((customer, index) => (
                <tr key = {index} onClick={() => onCustomer(customer)}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <div>
            <h5> Update</h5>
            <form className="p-3">
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="name"
                        name = "name"
                    />
                </div>
                <div className="form-group"> 
                <label htmlFor="email">Email: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="email"
                        name = "email"
                    />
                </div>
                <div className="form-group"> 
                <label htmlFor="pass">Pass: </label>
                    <input 
                        type="text"
                        className="form-control"
                        id="pass"
                        name = "pass"
                    />
                </div>
                <button type="button" onClick={onDeleteClick}>Delete</button>
                <button type="button" onClick={onSaveClick}>Save</button>
                <button type="button" onClick={onCancelClick}>Cancel</button>
            </form>
        </div>
    </div>
  );
}

export default App;
