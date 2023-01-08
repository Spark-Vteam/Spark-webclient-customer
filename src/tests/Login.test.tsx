import { render, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

test('renders register button', () => {
  const setUserDataMock = jest.fn();
  const { getByText } = render(<Login setUserData={setUserDataMock} />);
  expect(getByText('Register with GitHub')).toBeInTheDocument();
});

test('displays modal when login button is clicked', async () => {
  const setUserDataMock = jest.fn();
  const { getByText, getByTestId } = render(<Login setUserData={setUserDataMock} />);
  fireEvent.click(getByText('Username login'));
  expect(getByTestId('modal')).toBeInTheDocument();
});
