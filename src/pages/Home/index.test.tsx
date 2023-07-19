import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home', () => {
  test('renders Cards component', () => {
    render(<Home />);
    const cardsElement = screen.getByTestId('cards-component');
    expect(cardsElement).toBeInTheDocument();
  });
});
