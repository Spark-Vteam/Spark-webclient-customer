import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Overview from '../components/Overview';

test('renders Navbar', () => {
  const userData = {};
  const logout = jest.fn();
  const singleUser = [{ id: 1, Balance: 100 }];
  render(
    <HashRouter>
      <Overview userData={userData} logout={logout} singleUser={singleUser} />
    </HashRouter>,
  );
  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});

test('renders Navbar links', () => {
  const userData = {};
  const logout = jest.fn();
  const singleUser = [{ id: 1, Balance: 100 }];
  render(
    <HashRouter>
      <Overview userData={userData} logout={logout} singleUser={singleUser} />
    </HashRouter>,
  );
  const overviewLink = screen.getByText('Overview');
  expect(overviewLink).toBeInTheDocument();
  const historyLink = screen.getByText('History');
  expect(historyLink).toBeInTheDocument();
  const paymentLink = screen.getByText('Payment');
  expect(paymentLink).toBeInTheDocument();
});

test('renders payment link and message', () => {
  const singleUser = [{ id: 1, FirstName: 'Test', PartialPayment: 0, Balance: 0 }];
  const userData = {};
  const logout = jest.fn();
  render(
    <HashRouter>
      <Overview userData={userData} logout={logout} singleUser={singleUser} />
    </HashRouter>,
  );
  const paymentLink = screen.getByText('Add payment method');
  expect(paymentLink).toBeInTheDocument();
  const paymentMessage = screen.getByText(
    'Seems like you not have added any Payment method. Click link above to easily add a credit card or to load money to your account.',
  );
  expect(paymentMessage).toBeInTheDocument();
});

