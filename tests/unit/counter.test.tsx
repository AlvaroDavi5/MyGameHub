import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Counter } from '@components/counter';
import { renderWithProviders } from '../utils';

function getCounterValue(): number | undefined {
	const content = screen.getByTestId('counter-value').textContent;
	return content ? Number(content) : undefined;
}

describe('Counter', () => {
	describe('state', () => {
		it('should start from the default initial value', () => {
			renderWithProviders(<Counter />);

			expect(getCounterValue()).toBe(0);
		});

		it('should start from the received initial value', () => {
			renderWithProviders(<Counter initialValue={7} />);

			expect(getCounterValue()).toBe(7);
		});

		it('should increment the state on increment click', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter />);

			await user.click(screen.getByRole('button', { name: 'increment' }));
			await user.click(screen.getByRole('button', { name: 'increment' }));

			expect(getCounterValue()).toBe(2);
		});

		it('should decrement the state below zero on decrement click', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter />);

			await user.click(screen.getByRole('button', { name: 'decrement' }));

			expect(getCounterValue()).toBe(-1);
		});

		it('should keep the state of each instance isolated', async () => {
			const user = userEvent.setup();
			renderWithProviders(
				<>
					<Counter label="First" />
					<Counter label="Second" />
				</>
			);

			const [firstIncrement] = screen.getAllByRole('button', { name: 'increment' });
			await user.click(firstIncrement);

			const [firstValue, secondValue] = screen.getAllByTestId('counter-value');
			expect(firstValue).toHaveTextContent('1');
			expect(secondValue).toHaveTextContent('0');
		});
	});

	describe('logic', () => {
		it('should apply the received step on increment', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter initialValue={10} step={5} />);

			await user.click(screen.getByRole('button', { name: 'increment' }));

			expect(getCounterValue()).toBe(15);
		});

		it('should apply the received step on decrement', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter initialValue={10} step={5} />);

			await user.click(screen.getByRole('button', { name: 'decrement' }));

			expect(getCounterValue()).toBe(5);
		});

		it('should restore the initial value on reset, not zero', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter initialValue={7} />);

			await user.click(screen.getByRole('button', { name: 'increment' }));
			await user.click(screen.getByRole('button', { name: 'reset' }));

			expect(getCounterValue()).toBe(7);
		});

		it('should handle a negative step by inverting each action', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter step={-2} />);

			await user.click(screen.getByRole('button', { name: 'increment' }));

			expect(getCounterValue()).toBe(-2);
		});
	});

	describe('flows', () => {
		it('should accumulate a sequence of increments and decrements', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter initialValue={5} step={3} />);

			await user.click(screen.getByRole('button', { name: 'increment' }));
			await user.click(screen.getByRole('button', { name: 'increment' }));
			await user.click(screen.getByRole('button', { name: 'decrement' }));

			expect(getCounterValue()).toBe(8);
		});

		it('should keep counting after a reset', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter initialValue={2} />);

			await user.click(screen.getByRole('button', { name: 'increment' }));
			await user.click(screen.getByRole('button', { name: 'reset' }));
			await user.click(screen.getByRole('button', { name: 'increment' }));

			expect(getCounterValue()).toBe(3);
		});

		it('should return to the initial value when every action is undone', async () => {
			const user = userEvent.setup();
			renderWithProviders(<Counter initialValue={4} />);

			await user.click(screen.getByRole('button', { name: 'increment' }));
			await user.click(screen.getByRole('button', { name: 'increment' }));
			await user.click(screen.getByRole('button', { name: 'decrement' }));
			await user.click(screen.getByRole('button', { name: 'decrement' }));

			expect(getCounterValue()).toBe(4);
		});
	});
});
