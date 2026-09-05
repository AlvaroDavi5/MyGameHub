import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Counter } from '~/components/counter';
import { renderWithProviders } from '../utils';

describe('Counter rendering', () => {
	it('should render the component with its default label and value', () => {
		renderWithProviders(<Counter />);

		expect(screen.getByTestId('counter')).toBeInTheDocument();
		expect(screen.getByText('Counter')).toBeInTheDocument();
		expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
	});

	it('should render the received label and initial value', () => {
		renderWithProviders(<Counter label="Lives" initialValue={3} />);

		expect(screen.getByText('Lives')).toBeInTheDocument();
		expect(screen.getByTestId('counter-value')).toHaveTextContent('3');
	});

	it('should render one accessible button per action', () => {
		renderWithProviders(<Counter />);

		expect(screen.getAllByRole('button')).toHaveLength(3);
		expect(screen.getByRole('button', { name: 'decrement' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'reset' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'increment' })).toBeInTheDocument();
	});

	it('should announce the value to assistive technologies', () => {
		renderWithProviders(<Counter />);

		expect(screen.getByTestId('counter-value')).toHaveAttribute('aria-live', 'polite');
	});

	it('should render styled by the Chakra provider', () => {
		renderWithProviders(<Counter />);

		expect(screen.getByTestId('counter').className).toMatch(/css-/);
	});
});
