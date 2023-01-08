import { render, screen } from '@testing-library/react';
import ChoosePayment from '../components/ChoosePayment';
import { HashRouter } from 'react-router-dom';

jest.mock('../models/paymentModels');

test('Make sure trip by trip button displays', () => {
  const user = { id: '1', PartialPayment: 0 };
  render(
    <HashRouter>
      <ChoosePayment user={user} />
    </HashRouter>,
  );
  expect(screen.getByText(/Pay trip by trip/i)).toBeInTheDocument();
});

test('Make sure monthly button displays', () => {
  const user = { id: '1', PartialPayment: 0 };
  render(
    <HashRouter>
      <ChoosePayment user={user} />
    </HashRouter>,
  );
  expect(screen.getByText(/Pay trips monthly/i)).toBeInTheDocument();
});
