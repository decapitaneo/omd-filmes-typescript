import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cards from '../Cards';
jest.mock('./cards.css', () => ({}));

describe('Cards', () => {
  test('renders loading state', () => {
    render(<Cards />);
    const loadingText = screen.getByText('Carregando Filmes');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders films after loading', async () => {
    render(
      <Router>
        <Cards />
      </Router>
    );

    // Simulate loading state
    await screen.findByText('Carregando Filmes');

    // Assert films are rendered
    const films = await screen.findAllByRole('img');
    expect(films.length).toBeGreaterThan(0);
  });

  test('renders film details link', async () => {
    render(
      <Router>
        <Cards />
      </Router>
    );

    // Simulate loading state
    await screen.findByText('Carregando Filmes');

    // Find film details link
    const filmLink = await screen.findByText('Detalhes');
    expect(filmLink).toBeInTheDocument();
    expect(filmLink.getAttribute('href')).toMatch(/\/card\/\w+/);
  });
});
