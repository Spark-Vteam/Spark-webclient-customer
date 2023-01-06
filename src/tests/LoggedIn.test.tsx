import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import LoggedIn from '../components/LoggedIn';
// jest.mock('./models/paymentModels');

// Add a type assertion to specify that getInvoicesByUser is a mock function

test('renders Payment component', () => {
  const userData = {};
  const logout = jest.fn();
  const singleUser = [{ id: 1, Balance: 100 }];
  render(
    <HashRouter>
      <LoggedIn userData={userData} logout={logout} singleUser={singleUser} />
    </HashRouter>,
  );

  const overviewRoute = screen.getByTestId('overview-route');
  expect(overviewRoute).toBeInTheDocument();
});
