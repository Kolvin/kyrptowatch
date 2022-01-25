import { render, screen } from '@testing-library/react';
import App from './App';

test('page renders', async () => {
  render(<App/>);

  // renders site title
  expect(await screen.findByText(/Kyrptowatch/i)).toBeInTheDocument();

  // renders currency dropdown
  expect(await screen.findByTestId('currency-select')).toBeInTheDocument();

  // renders search bar
  expect(await screen.findByPlaceholderText('Search Kyrptos')).toBeInTheDocument();
});