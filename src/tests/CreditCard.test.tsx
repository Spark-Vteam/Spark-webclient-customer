import { render, screen } from '@testing-library/react';
import CreditCard from '../components/CreditCard';
import { HashRouter } from 'react-router-dom';

jest.mock('../models/paymentModels');

const user = {
  id: '1',
  Balance: 1000,
  EmailAdress: 'test@example.com',
  FirstName: 'John',
  LastName: 'Doe',
  Oauth: '',
  PartialPayment: 0,
  Password: '',
  PhoneNumber: '1234567890',
};

test('should render the correct input fields', () => {
  render(
    <HashRouter>
      <CreditCard user={user} />
    </HashRouter>,
  );
  const panInput = screen.getByPlaceholderText('Card number');
  const expiryInput = screen.getByPlaceholderText('MM/YY');
  const firstNameInput = screen.getByPlaceholderText('First Name');
  const lastNameInput = screen.getByPlaceholderText('Last Name');
  const submitButton = screen.getByText('Add card');
  expect(panInput).toBeInTheDocument();
  expect(expiryInput).toBeInTheDocument();
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});
