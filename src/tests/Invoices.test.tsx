import { render, screen } from '@testing-library/react';
import Invoices from '../components/Invoices';

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

const invoices = [
  {
    Amount: 500,
    Created: '2022-12-14T22:28:16.000Z',
    Expires: '2022-12-15T22:28:16.000Z',
    Paid: '',
    Rents_id: 1,
    Status: 10,
    Users_id: 1,
    id: 1,
  },
  {
    Amount: 1000,
    Created: '2022-12-14T22:28:16.000Z',
    Expires: '2022-12-15T22:28:16.000Z',
    Paid: '',
    Rents_id: 2,
    Status: 10,
    Users_id: 1,
    id: 2,
  },
];
const creditCard = {
  pan: '12345678',
  expiry: '06/23',
  firstname: 'John',
  lastname: 'Doe',
  truncpan: '6578',
};

test('should render the component', () => {
  render(<Invoices invoices={invoices} user={user} creditCard={creditCard} truncPan='1234' />);
  const invoicesContainerElement = screen.getByTestId('invoices-container');
  const pricingTableElement = screen.getByTestId('pricing-table');
  const pricingTableHeadElement = screen.getByTestId('pricing-table-head');
  const pricingTableBodyElement = screen.getByTestId('pricing-table-body');
  expect(invoicesContainerElement).toBeInTheDocument();
  expect(pricingTableElement).toBeInTheDocument();
  expect(pricingTableHeadElement).toBeInTheDocument();
  expect(pricingTableBodyElement).toBeInTheDocument();
});
