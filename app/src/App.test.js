import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with project name', () => {
  render(<App />);
  const headerElement = screen.getByText(/Hello Kyrptowatch/i);
  expect(headerElement).toBeInTheDocument();
});
