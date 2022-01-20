import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with project name', () => {
  render(<App />);
  const headerElement = screen.getByText(/Kyrptowatch/i);
  expect(headerElement).toBeInTheDocument();
});


test('renders search bar', () => {
  render(<App />);
  const searchElement = screen.getByPlaceholderText('Search Kyrptos');
  expect(searchElement).toBeInTheDocument();
});


test('renders currency dropdown', () => {
  render(<App />);
  const dropdownElement = screen.getByTestId('currency-select');
  expect(dropdownElement).toBeInTheDocument();
});
