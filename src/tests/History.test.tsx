import { render, screen } from '@testing-library/react';
import History from '../components/History';
import { HashRouter } from 'react-router-dom';

const userData = {
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

const singleUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  emailAdress: 'test@example.com',
  phoneNumber: '1234567890',
  password: '',
  oauth: '',
};

test('should render the component', () => {
  render(
    <HashRouter>
      <History userData={userData} logout={() => {''}} singleUser={singleUser} />
    </HashRouter>,
  );
  const containerElement = screen.getByTestId('container');
  expect(containerElement).toBeInTheDocument();
});

test('should render the component w. correct text', () => {
  render(
    <HashRouter>
      <History userData={userData} logout={() => {''}} singleUser={singleUser} />
    </HashRouter>,
  );
  const containerElement = screen.getByTestId('container');
  const historyHeaderElement = screen.getByText(/History of your trips/);
  expect(containerElement).toBeInTheDocument();
  expect(historyHeaderElement).toBeInTheDocument();
});
