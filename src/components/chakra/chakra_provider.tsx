import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { colorModeConfig } from '@configs/chakra/colorMode';
import { system } from '@configs/chakra/theme';
import { AppToaster } from './toaster';

interface ChakraProviderProps {
	children: ReactNode;
}

/**
 * Single entry point that wires the Chakra configuration into the React tree.
 **/
export function AppChakraProvider({ children }: ChakraProviderProps) {
	return (
		<ChakraProvider value={system}>
			<ThemeProvider {...colorModeConfig}>
				{children}
				<AppToaster />
			</ThemeProvider>
		</ChakraProvider>
	);
}
