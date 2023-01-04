import { render, screen, fireEvent, act } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Payment from '../components/Payment';
// jest.mock('./models/paymentModels');

// Add a type assertion to specify that getInvoicesByUser is a mock function

test('renders Payment component', () => {
  const userData = {};
  const logout = jest.fn();
  const singleUser = [{ id: 1, Balance: 100 }];
  const { getByText } = render(
    <HashRouter>
      <Payment userData={userData} logout={logout} singleUser={singleUser} />
    </HashRouter>,
  );
  const balanceLabel = getByText(/Current balance/i);
  const updateBalanceForm = getByText(/Update balance/i);
  const invoicesTable = getByText(/Invoices/i);

  expect(balanceLabel).toBeInTheDocument();
  expect(updateBalanceForm).toBeInTheDocument();
  expect(invoicesTable).toBeInTheDocument();
});

test('renders payment form', () => {
  const userData = {};
  const logout = jest.fn();
  const singleUser = [{ id: 1, Balance: 100 }];
  render(
    <HashRouter>
      <Payment userData={userData} logout={logout} singleUser={singleUser} />
    </HashRouter>,
  );
  const currentBalanceElement = screen.getByText('Current balance: 100 SEK');
  const updateBalanceElement = screen.getByText('Update balance');
  expect(currentBalanceElement).toBeInTheDocument();
  expect(updateBalanceElement).toBeInTheDocument();
});
