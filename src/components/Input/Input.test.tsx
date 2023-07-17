import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './index';

jest.mock('./input.css', () => ({}));

describe('Input', () => {
  test('calls handleSearch with the new title when input value changes', async() => {
    // Mock the browser environment
    const { JSDOM } = require('jsdom');
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
    const { window } = jsdom;

    global.window = window;
    global.document = window.document;

    // Arrange
    const handleSearchMock = jest.fn();
    const { getByPlaceholderText } = render(<Input handleSearch={handleSearchMock} />);
    const inputElement = getByPlaceholderText('Search...');

    // Act
    fireEvent.change(inputElement, { target: { value: 'New Title' } });

    // Assert
    // Wait for the component to update
    await waitFor(() => {
      // Assert
      expect(handleSearchMock).toHaveBeenCalledWith('New Title');
    });
   });
});
