import React from 'react';

const CustomerAddUpdateForm = ({ customerData, handleInputChange, onSaveClick, onDeleteClick, onCancelClick, mode }) => {
  return (
    <div className='customer_form'>
      <h5>{mode}</h5> {/* Mode will be either "Add Customer" or "Update Customer" */}
      <form className="p-3">
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={customerData.name}
            placeholder="Enter name"
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
            placeholder="Enter email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password: </label>
          <input
            type="text"
            className="form-control"
            id="pass"
            name="password"
            value={customerData.password}
            placeholder="Enter password"
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons-container">
          <button type="button" onClick={onDeleteClick} disabled={mode === 'Add Customer'}> {/* Disable delete button in Add mode */}
            Delete
          </button>
          <button type="button" onClick={onSaveClick}>
            Save
          </button>
          <button type="button" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerAddUpdateForm;
