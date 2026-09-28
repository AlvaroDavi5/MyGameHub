import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchForm } from '../../src/components/forms/search-form';
import { renderWithProviders } from '../utils';

describe('SearchForm rendering', () => {
	it('should render the input and the submit button', () => {
		renderWithProviders(<SearchForm onSearch={vi.fn()} />);

		expect(screen.getByTestId('search-input')).toBeInTheDocument();
		expect(screen.getByTestId('search-button')).toBeInTheDocument();
	});

	it('should render the input with its placeholder', () => {
		renderWithProviders(<SearchForm onSearch={vi.fn()} />);

		expect(screen.getByPlaceholderText('Digite o username ou SteamID')).toBeInTheDocument();
	});

	it('should render the submit button disabled while the input is empty', () => {
		renderWithProviders(<SearchForm onSearch={vi.fn()} />);

		expect(screen.getByTestId('search-button')).toBeDisabled();
	});

	it('should render the submit button disabled when a search is already in progress', () => {
		renderWithProviders(<SearchForm isSearching onSearch={vi.fn()} />);

		expect(screen.getByTestId('search-button')).toBeDisabled();
	});

	it('should render styled by the Chakra provider', () => {
		renderWithProviders(<SearchForm onSearch={vi.fn()} />);

		expect(screen.getByLabelText('input-element').className).toMatch(/css-/);
	});
});
