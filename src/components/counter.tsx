import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface CounterProps {
	label?: string;
	initialValue?: number;
	step?: number;
}

/**
 * Minimal stateful component, kept as a reference for component tests.
 **/
export function Counter({ label = 'Counter', initialValue = 0, step = 1 }: CounterProps) {
	const [count, setCount] = useState(initialValue);

	return (
		<VStack gap={3} data-testid="counter">
			<Text fontWeight="medium">{label}</Text>
			<Text aria-live="polite" data-testid="counter-value">
				{count}
			</Text>
			<HStack gap={2}>
				<Button aria-label="decrement" onClick={() => setCount((current) => current - step)}>
					-
				</Button>
				<Button aria-label="reset" onClick={() => setCount(initialValue)} variant="outline">
					reset
				</Button>
				<Button aria-label="increment" onClick={() => setCount((current) => current + step)}>
					+
				</Button>
			</HStack>
		</VStack>
	);
}
