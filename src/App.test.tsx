import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { HashRouter } from 'react-router-dom';
import Home from './components/Home';

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
