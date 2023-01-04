import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Home from '../components/Home';
import userModel from '../models/userModels';

test('renders home page', () => {
  render(
    <HashRouter>
      <Home />
    </HashRouter>,
  );
  const registerElement = screen.getByText('Continue to site by adding your information:');
  expect(registerElement).toBeInTheDocument();
});

test('renders user form', () => {
  const { getByPlaceholderText } = render(<Home userData={{ id: 1 }} logout={() => {}} />);
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const firstNameInput = getByPlaceholderText('First name');
  const lastNameInput = getByPlaceholderText('Last name');
  const phoneInput = getByPlaceholderText('Phone number');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
});
