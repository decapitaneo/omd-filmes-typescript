import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils'; 
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Card from '../Detalhe';

// Mock the useParams and useNavigate hooks
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock the API response
jest.mock('../../services/api', () => ({
  get: jest.fn(),
}));

// Mock the localStorage
const localStorageMock = (() => {
    let store: Record<string, any> = {};
    return {
      getItem: (key: string) => store[key],
      setItem: (key: string, value: any) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Card', () => {
  test('renders loading state initially', async () => {
    // Mock the useParams to return a valid IMDb ID
    (useParams as jest.Mock).mockReturnValue({ id: 'tt1234567' });

    // Mock the API response with an empty movie object to simulate loading state
    (api.get as jest.Mock).mockResolvedValue({ data: {} });

    render(<Card />);

    // Assert that the loading text is displayed
    expect(screen.getByText('Carregando detalhes...')).toBeInTheDocument();

    // Wait for the API call to complete
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // Assert that the loading text is removed
    expect(screen.queryByText('Carregando detalhes...')).not.toBeInTheDocument();
  });

  test('navigates to home page when movie not found', async () => {
    // Mock the useParams to return a valid IMDb ID
    (useParams as jest.Mock).mockReturnValue({ id: 'tt1234567' });

    // Mock the API response with a rejected promise to simulate movie not found
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Movie not found'));

    // Mock the navigate function
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<Card />);

    // Wait for the API call to complete
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // Assert that the navigate function was called with the correct arguments
    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });

  test('saves movie to localStorage', async () => {
    // Mock the useParams to return a valid IMDb ID
    (useParams as jest.Mock).mockReturnValue({ id: 'tt1234567' });

    // Mock the API response with a valid movie object
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        imdbID: 'tt1234567',
        Poster: 'poster.jpg',
        Title: 'Movie 1',
        Genre: 'Action',
        Year: 2021,
        imdbRating: 7.5,
        Actors: 'Actor 1, Actor 2',
        Plot: 'Movie 1 plot',
      },
    });

    render(<Card />);

    // Wait for the API call to complete
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // Click the "Favoritar" button to save the movie
    await act(async () => {
      screen.getByText('Favoritar').click();
    });

    // Assert that the movie is saved to localStorage
    const savedMovies = JSON.parse(localStorage.getItem('@dbflix') || '[]');
    expect(savedMovies).toHaveLength(1);
    expect(savedMovies[0].imdbID).toBe('tt1234567');
    expect(savedMovies[0].Title).toBe('Movie 1');
  });

});