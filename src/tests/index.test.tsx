import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App component with the same characteristics as index', () => {
  render(<App />);

  const homeLinkElement = screen.getByText(/Home/i);
  expect(homeLinkElement).toBeInTheDocument();

  const favoritosLinkElement = screen.getByText(/Favoritos/i);
  expect(favoritosLinkElement).toBeInTheDocument();

});
