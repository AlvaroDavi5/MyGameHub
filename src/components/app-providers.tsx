import { useState, type ReactElement, type ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createAppStore } from '@store/store';
import { AppChakraProvider } from './chakra/chakra_provider';

interface AppProvidersProps {
	children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): ReactElement {
	const [store] = useState(createAppStore);

	return (
		<ReduxProvider store={store}>
			<AppChakraProvider>{children}</AppChakraProvider>
		</ReduxProvider>
	);
}
