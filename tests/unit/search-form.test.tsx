import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchForm } from '../../src/pages/profile-search/components/search-form';
import { renderWithProviders } from '../utils';

function getInput(): HTMLInputElement {
	return screen.getByTestId('search-input') as HTMLInputElement;
}

function getSubmitButton(): HTMLButtonElement {
	return screen.getByTestId('search-button') as HTMLButtonElement;
}

describe('SearchForm', () => {
	describe('state', () => {
		it('should start with an empty input and a disabled button', () => {
			renderWithProviders(<SearchForm onSearch={vi.fn()} />);

			expect(getInput().value).toBe('');
			expect(getSubmitButton()).toBeDisabled();
		});

		it('should enable the button once a non-blank username is typed', async () => {
			const user = userEvent.setup();
			renderWithProviders(<SearchForm onSearch={vi.fn()} />);

			await user.type(getInput(), 'alvarodavi5');

			expect(getInput().value).toBe('alvarodavi5');
			expect(getSubmitButton()).toBeEnabled();
		});

		it('should keep the button disabled for a blank (whitespace-only) username', async () => {
			const user = userEvent.setup();
			renderWithProviders(<SearchForm onSearch={vi.fn()} />);

			await user.type(getInput(), '   ');

			expect(getSubmitButton()).toBeDisabled();
		});

		it('should disable the button again once the username is cleared', async () => {
			const user = userEvent.setup();
			renderWithProviders(<SearchForm onSearch={vi.fn()} />);

			await user.type(getInput(), 'alvarodavi5');
			expect(getSubmitButton()).toBeEnabled();

			await user.clear(getInput());

			expect(getSubmitButton()).toBeDisabled();
		});
	});

	describe('logic', () => {
		it('should call onSearch with the trimmed username on submit', async () => {
			const user = userEvent.setup();
			const onSearch = vi.fn();
			renderWithProviders(<SearchForm onSearch={onSearch} />);

			await user.type(getInput(), '  alvarodavi5  ');
			await user.click(getSubmitButton());

			expect(onSearch).toHaveBeenCalledTimes(1);
			expect(onSearch).toHaveBeenCalledWith('alvarodavi5');
		});

		it('should disable the button immediately after a submit, before the input changes again', async () => {
			const user = userEvent.setup();
			renderWithProviders(<SearchForm onSearch={vi.fn()} />);

			await user.type(getInput(), 'alvarodavi5');
			await user.click(getSubmitButton());

			expect(getSubmitButton()).toBeDisabled();
		});

		it('should keep the button disabled while isSearching is true, even with a filled input', async () => {
			const user = userEvent.setup();
			renderWithProviders(<SearchForm isSearching onSearch={vi.fn()} />);

			await user.type(getInput(), 'alvarodavi5');

			expect(getSubmitButton()).toBeDisabled();
		});
	});

	describe('flows', () => {
		it('should allow searching again after typing a new username following a submit', async () => {
			const user = userEvent.setup();
			const onSearch = vi.fn();
			renderWithProviders(<SearchForm onSearch={onSearch} />);

			await user.type(getInput(), 'first-user');
			await user.click(getSubmitButton());
			expect(getSubmitButton()).toBeDisabled();

			await user.clear(getInput());
			await user.type(getInput(), 'second-user');
			expect(getSubmitButton()).toBeEnabled();

			await user.click(getSubmitButton());

			expect(onSearch).toHaveBeenCalledTimes(2);
			expect(onSearch).toHaveBeenNthCalledWith(1, 'first-user');
			expect(onSearch).toHaveBeenNthCalledWith(2, 'second-user');
		});

		it('should not call onSearch while the button is disabled', async () => {
			const user = userEvent.setup();
			const onSearch = vi.fn();
			renderWithProviders(<SearchForm onSearch={onSearch} />);

			await user.click(getSubmitButton());

			expect(onSearch).not.toHaveBeenCalled();
		});
	});
});
