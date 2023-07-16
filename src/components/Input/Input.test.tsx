import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './index';

jest.mock('./input.css', () => ({}));

describe('Input', () => {
  test('calls handleSearch with the new title when input value changes', () => {
    // Arrange
    const handleSearchMock = jest.fn();
    render(<Input handleSearch={handleSearchMock} />);

    expect(handleSearchMock).toHaveBeenCalledWith('New Title');
  });
});
