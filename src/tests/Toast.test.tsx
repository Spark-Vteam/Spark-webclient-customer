import { render, screen, fireEvent } from '@testing-library/react';
import Toast from '../components/Toast';

test('displays the toast message', () => {
  render(<Toast message='This is a toast message' />);
  expect(screen.getByText('This is a toast message')).toBeInTheDocument();
});

test('hides the toast when the close button is clicked', () => {
  render(<Toast message='Toast message' />);
  const closeButton = screen.getByText('Close');
  fireEvent.click(closeButton);
  expect(screen.queryByText('Toast message')).not.toBeNull();
});
