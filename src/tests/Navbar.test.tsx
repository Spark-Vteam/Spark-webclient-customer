import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import NavbarStart from '../components/NavbarStart';
import Navbar from '../components/Navbar';
import NavbarMin from '../components/NavbarMin';

test('renders Start link', () => {
  render(
    <HashRouter>
      <NavbarStart />
    </HashRouter>,
  );
  const startLink = screen.getByText('Start');
  expect(startLink).toBeInTheDocument();
});

test('renders correct number of links', () => {
  const logout = jest.fn();
  render(
    <HashRouter>
      <Navbar logout={logout} />
    </HashRouter>,
  );
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
});

test('clicking logout button calls logout function', () => {
  const logout = jest.fn();
  render(
    <HashRouter>
      <Navbar logout={logout} />
    </HashRouter>,
  );
  const logoutButton = screen.getByText('Log out');
  fireEvent.click(logoutButton);
  expect(logout).toHaveBeenCalled();
});

test('clicking logout button calls logout function', () => {
  const logout = jest.fn();
  render(
    <HashRouter>
      <NavbarMin logout={logout} />
    </HashRouter>,
  );
  const logoutButton = screen.getByText('Log out');
  fireEvent.click(logoutButton);
  expect(logout).toHaveBeenCalled();
});
