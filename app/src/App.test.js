import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with project name', async () => {
  render(<App/>);
  expect(await screen.findByText(/Kyrptowatch/i)).toBeInTheDocument();
});


test('renders search bar', async () => {
  render(<App/>);
  expect(await screen.findByPlaceholderText('Search Kyrptos')).toBeInTheDocument();
});


test('renders currency dropdown', async () => {
  render(<App/>);
  expect(await screen.findByTestId('currency-select')).toBeInTheDocument();
});
