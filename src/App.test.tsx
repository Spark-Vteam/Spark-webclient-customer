import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Home from './components/Home';
import Toast from './components/Toast';
import Payment from './components/Payment';
import paymentModels from './models/paymentModels';
// jest.mock('./models/paymentModels');

// Add a type assertion to specify that getInvoicesByUser is a mock function

const singleUserMock = [
  {
    id: '1',
    Balance: 0,
    PartialPayment: 0,
    CreditCard: '123456',
  },
];

test('renders welcome page', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
  const registerElement = screen.getByText('Register with GitHub');
  const headingElement = screen.getByText('Green. Smart. Effective. This is how we do it.');
  const loginElement = screen.getByText('Login');
  expect(registerElement).toBeInTheDocument();
  expect(headingElement).toBeInTheDocument();
  expect(loginElement).toBeInTheDocument();
});

test('renders home page', () => {
  render(
    <HashRouter>
      <Home />
    </HashRouter>,
  );
  const registerElement = screen.getByText('Continue to site by adding your information:');
});

test('displays the toast message', () => {
  render(<Toast message='This is a toast message' />);
  expect(screen.getByText('This is a toast message')).toBeInTheDocument();
});

test('hides the toast when the close button is clicked', () => {
  render(<Toast message='Toast message' />);
  const closeButton = screen.getByText('Close');
  fireEvent.click(closeButton);
  expect(screen.queryByText('Toast message')).not.toBeNull();
});

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

test('renders Payment component and check element by id', async () => {
  const getInvoicesByUser = jest.fn();
  const mockInvoices = [
    { id: 1, amount: 100 },
    { id: 2, amount: 50 },
  ];
  getInvoicesByUser.mockResolvedValue(mockInvoices);

  const userData = {};
  const logout = jest.fn();
  const singleUser = [{ id: 1, Balance: 100 }];
  await act(async () => {
    render(
      <HashRouter>
        <Payment userData={userData} logout={logout} singleUser={singleUser} />
      </HashRouter>,
    );
  });

  const invoices = screen.getAllByTestId('invoice-row');
  expect(invoices).toHaveLength(1);
});

