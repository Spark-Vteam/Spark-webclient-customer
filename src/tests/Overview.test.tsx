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
