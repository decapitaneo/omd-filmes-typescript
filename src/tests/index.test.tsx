import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App component with the same characteristics as index', () => {
  // Render the App component
  render(<App />);

  // Test if the "Home" link is rendered
  const homeLinkElement = screen.getByText(/Home/i);
  expect(homeLinkElement).toBeInTheDocument();

  // Test if the "Favoritos" link is rendered
  const favoritosLinkElement = screen.getByText(/Favoritos/i);
  expect(favoritosLinkElement).toBeInTheDocument();

});
