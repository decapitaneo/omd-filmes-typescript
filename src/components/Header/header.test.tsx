import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

test('renders the header component', () => {
  // Arrange
  const { getByText } = render(<Header />);

  // Act
  const logoElement = getByText('Movie DBFlix');
  const favoritosLink = getByText('Favoritos');
  const homeLink = getByText('Home');

  // Assert
  expect(logoElement).toBeInTheDocument();
  expect(favoritosLink).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
});
