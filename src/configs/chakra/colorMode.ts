import type { ThemeProviderProps } from 'next-themes';

/**
 * Color mode configuration consumed by `next-themes`, which Chakra UI v3
 * uses as its color mode driver (`_light` / `_dark` conditions).
 **/
export const colorModeConfig: Omit<ThemeProviderProps, 'children'> = {
	attribute: 'class',
	defaultTheme: 'system',
	enableSystem: true,
	disableTransitionOnChange: true,
};
