import React from 'react';

const CustomerTable = (prop) => {
    return(
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
                    {prop.data.map((customer, index) => (
                         <tr key = {index}>
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

export default CustomerTable;