import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Cards from '../Cards';
import api from '../../services/api';

jest.mock('../../services/api', () => ({
  get: jest.fn(),
}));

describe('Cards', () => {
  test('renders loading state initially', async () => {
    // Mock the API response
    const mockedResponse = {
      data: {
        Search: [],
      },
    };
    (api.get as jest.Mock).mockResolvedValue(mockedResponse);

    render(<Cards />);

    // Define a custom text matcher function
    const loadingTextMatcher = (content: string, element: HTMLElement) => {
      const text = element.textContent || '';
      const regex = /carregando filmes/i;
      return regex.test(text);
    };

    // Expect the loading text to be displayed
    const loadingText = screen.getByText(loadingTextMatcher);
    expect(loadingText).toBeInTheDocument();

    // Wait for the API call to be made
    await waitFor(() => expect(api.get).toHaveBeenCalled());

    // Expect the loading text to be removed
    expect(loadingText).not.toBeInTheDocument();
  });

  // Add more test cases as needed
});
