import React, {useState} from "react";

const AddCustomer = ({AddCustomer}) => {
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        password: ''
    });

      // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the state with the new input value
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add a timestamp or any other metadata if needed
    const submission = {
      ...customerData,
      addedTimestamp: new Date().toISOString(),
    };

    // Example: Call API to submit data
    try {
      const response = await fetch('https://api.example.com/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Customer added successfully', result);

      // Optionally clear form or handle success message
      setCustomerData({
        name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

    return (
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
                <button type="submit">Delete</button>
                <button type="submit">Save</button>
                <button type="submit">Cancel</button>
            </form>
        </div>
    )
}

export default AddCustomer;