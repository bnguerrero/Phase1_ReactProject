import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as memDB from './assets/memdb'
import '@testing-library/jest-dom';

// Mock getAll, deleteById, post, and put functions.
jest.mock('./assets/memdb', () => ({
  getAll: jest.fn(),
  deleteById: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));


describe('App.js Tests', () => {

  // returns list of customers before each test
  beforeEach(() => {
    memDB.getAll.mockReturnValue([
      { id: 1, name: 'Brianne Guerrero', email: 'bri@abc.com', password: 'secret007' },
      { id: 2, name: 'Naga Kolli', email: 'naga@abc.com', password: 'shhhh123' },
      { id: 3, name: "Eylem Uysal", email: 'eylem@abc.com', password: 'whisperwhisper24' }
    ]);
  });

  // clears all mock data after each test (aka clean state)
  afterEach(() => {
    jest.clearAllMocks();
  });


  it('verifies CustomerList and form components render', () => {
    render(<App />);

    // Verify the Customer List header and table is shown
    expect(screen.getByText('Customer List')).toBeInTheDocument();
    expect(screen.getAllByRole('table')[0]).toBeInTheDocument();

    // Verify the Add Customer header, buttons, and inputs are shown
    expect(screen.getByText('Add Customer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });


  it('displays customer data when customer is clicked', () => {
    render(<App />);

    // click on customer Brianne Guerrero and check if data appears in form
    const customer = screen.getByText('Brianne Guerrero');
    fireEvent.click(customer);

    // Check if mode is now "Update Customer" 
    expect(screen.getByText('Update Customer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Brianne Guerrero')).toBeInTheDocument();
    expect(screen.getByDisplayValue('bri@abc.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('secret007')).toBeInTheDocument();
  });


  it('deletes selected customer', async () => {
    render(<App />);

    // Select an existing customer
    const customer = screen.getByText('Brianne Guerrero');
    fireEvent.click(customer);

    // Click the Delete button
    fireEvent.click(screen.getByText('Delete'));

    // Verify the form resets to "Add Customer"
    expect(screen.getByText('Add Customer')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toHaveValue(''); 
    expect(screen.getByLabelText('Email:')).toHaveValue(''); 
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });

  it('adds a new customer', () => {
    render(<App />);

    // Verify form is in "Add Customer" mode 
    expect(screen.getByText('Add Customer')).toBeInTheDocument();

    // Fill out new customer information in form
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'Scoobert Doo' },
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'scoobydoo@abc.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'scoobysnacks' },
    });

    // Click Save button
    fireEvent.click(screen.getByText('Save'));


    // verify post request
    expect(memDB.post).toHaveBeenCalledWith({
      id: -1,
      name: 'Scoobert Doo',
      email: 'scoobydoo@abc.com',
      password: 'scoobysnacks',
    });


    // Verify the form resets to "Add Customer" mode after saving
    expect(screen.getByText('Add Customer')).toBeInTheDocument();
  });


  it('updates a customer', () => {
    render(<App />);

    // Click on an existing customer
    const customer = screen.getByText('Naga Kolli');
    fireEvent.click(customer);

    // change the customer's password
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'newPassword' },
    });

    // Click the Save button
    fireEvent.click(screen.getByText('Save'));


    // verify put request 
    expect(memDB.put).toHaveBeenCalledWith(2, {
      id: 2,
      name: 'Naga Kolli',
      email: 'naga@abc.com',
      password: 'newPassword',
    });
  });


  it('selects existing customer and validates cancel buton works ', () => {
    render(<App />);

    // Click on existing customer
    const customer = screen.getByText('Eylem Uysal');
    fireEvent.click(customer);

    // Click on Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Verify the form resets
    expect(screen.getByText('Add Customer')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toHaveValue('');
    expect(screen.getByLabelText('Email:')).toHaveValue('');
    expect(screen.getByLabelText('Password:')).toHaveValue('');
  });
});
