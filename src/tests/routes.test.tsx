import React from 'react';
import { render, screen } from '@testing-library/react';
import RoutesApp from '../routes';

test('renders RoutesApp component', () => {
  render(<RoutesApp />);
  const homeElement = screen.getByText(/Welcome ao nosso Movie DBFlix/i);
  expect(homeElement).toBeInTheDocument();

});
