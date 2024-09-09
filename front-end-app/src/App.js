import './App.css';
import customer_data from './assets/customer.json';
import CustomerTable from './components/CustomerTabe';
function App() {
  return (
    <div className='card-container'>
      <CustomerTable data ={customer_data}/>
    </div>
  );
}

export default App;
