import { render, screen } from '@testing-library/react';
import App from '../App';
import { HashRouter } from 'react-router-dom';

test('renders welcome page', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
  const registerElement = screen.getByText('Register with GitHub');
  const headingElement = screen.getByText('Green. Smart. Effective. This is how we do it.');
  expect(registerElement).toBeInTheDocument();
  expect(headingElement).toBeInTheDocument();
});

test('does not render login page when user is logged in', () => {
  localStorage.setItem('accessToken', 'test');
  render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
  const registerElement = screen.queryByText('Register with GitHub');
  expect(registerElement).not.toBeInTheDocument();
});

test('renders home page when access token exists', () => {
  localStorage.setItem('accessToken', 'some-access-token');

  render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
  const homePage = screen.getByText('Continue to site by adding your information:');
  expect(homePage).toBeInTheDocument();
});
