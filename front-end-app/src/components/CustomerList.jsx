import React from 'react';

const CustomerList = (props) => {
    return (
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
                    {props.data.map((customer, index) => (
                        <tr key={index}
                            onClick={() => props.onCustomerClick(customer)}
                            style={{
                                fontWeight: props.selectedCustomer &&
                                    props.selectedCustomer.name === customer.name ? 'bold' : 'normal'
                            }}
                        >
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;