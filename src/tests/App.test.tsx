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
