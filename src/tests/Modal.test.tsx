import { render, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

test('renders the modal', () => {
  const hideModal = jest.fn();
  const { getByText } = render(<Modal isOpen={true} showModal={() => {''}} hideModal={hideModal} />);

  expect(getByText('Log in')).toBeInTheDocument();
  expect(getByText('Email')).toBeInTheDocument();
  expect(getByText('Password')).toBeInTheDocument();
});

test('closes the modal when clicking the close button', () => {
  const hideModal = jest.fn();
  const { getByText } = render(<Modal isOpen={true} showModal={() => {''}} hideModal={hideModal} />);

  fireEvent.click(getByText('×'));
  expect(hideModal).toHaveBeenCalled();
});

test('Modal is not rendered when isOpen is false', () => {
  const { queryByTestId } = render(<Modal isOpen={false} />);
  expect(queryByTestId('modal')).toBeNull();
});

test('Modal is rendered when isOpen is true', () => {
  const { getByTestId } = render(<Modal isOpen={true} />);
  expect(getByTestId('modal')).toBeInTheDocument();
});

test('does not display toast message when showToast state is false', () => {
  const { queryByTestId } = render(<Modal showToast={false} />);
  expect(queryByTestId('toast')).toBeNull();
});
