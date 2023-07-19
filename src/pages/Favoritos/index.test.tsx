import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Favoritos from '../Favoritos';

describe('Favoritos', () => {
  test('renders empty state when no filmes are saved', () => {
    localStorage.clear();
    render(<Favoritos />);
    const emptyStateText = screen.getByText('Você não possui nenhum filme salvo!');
    expect(emptyStateText).toBeInTheDocument();
    });

  test('renders saved films', () => {
    const filmes = [
      { imdbID: '1', Poster: 'poster1.jpg', Title: 'Film 1' },
      { imdbID: '2', Poster: 'poster2.jpg', Title: 'Film 2' },
    ];
    localStorage.setItem('@dbflix', JSON.stringify(filmes));

    render(<Favoritos />);
    const film1 = screen.getByText('Film 1');
    const film2 = screen.getByText('Film 2');
    expect(film1).toBeInTheDocument();
    expect(film2).toBeInTheDocument();
  });

  test('removes film when delete button is clicked', () => {
    const filmes = [
      { imdbID: '1', Poster: 'poster1.jpg', Title: 'Film 1' },
      { imdbID: '2', Poster: 'poster2.jpg', Title: 'Film 2' },
    ];
    localStorage.setItem('@dbflix', JSON.stringify(filmes));

    render(<Favoritos />);
    const deleteButton = screen.getAllByText('Excluir')[0];
    fireEvent.click(deleteButton);

    const updatedFilms = JSON.parse(localStorage.getItem('@dbflix') || '[]');
    expect(updatedFilms.length).toBe(1);
    expect(updatedFilms[0].imdbID).toBe('2');

    const deletedFilm = screen.queryByText('Film 1');
    expect(deletedFilm).not.toBeInTheDocument();
  });
});
