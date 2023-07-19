import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './index';
import { BrowserRouter } from 'react-router-dom';

jest.mock('./input.css', () => ({}));

describe('Input', () => {
  test('calls handleSearch with the new title when input value changes', () => {
    // Arrange
    const handleSearchMock = jest.fn();
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <Input handleSearch={handleSearchMock} />
      </BrowserRouter>
    );
    const inputElement = getByPlaceholderText('Search...');

    // Act
    fireEvent.change(inputElement, { target: { value: 'New Title' } });

    // Assert
    expect(handleSearchMock).toHaveBeenCalledWith('New Title');
  });
});
