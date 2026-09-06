import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { AppChakraProvider } from '@components/chakra_provider';

function Providers({ children }: { children: ReactNode }) {
	return <AppChakraProvider>{children}</AppChakraProvider>;
}

/**
 * Renders a subject with the same providers the application mounts at its root.
 **/
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult {
	return render(ui, { wrapper: Providers, ...options });
}
