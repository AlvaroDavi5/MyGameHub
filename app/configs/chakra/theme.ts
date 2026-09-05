import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const fontStack = '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

/**
 * Theme configuration: design tokens only, no component code.
 * Merged over Chakra's `defaultConfig` by `system` below.
 **/
export const themeConfig = defineConfig({
	globalCss: {
		'html, body': {
			bg: 'bg.canvas',
			color: 'fg.default',
		},
	},
	theme: {
		tokens: {
			fonts: {
				heading: { value: fontStack },
				body: { value: fontStack },
			},
		},
		semanticTokens: {
			colors: {
				'bg.canvas': {
					value: { base: '{colors.white}', _dark: '{colors.gray.950}' },
				},
				'fg.default': {
					value: { base: '{colors.gray.800}', _dark: '{colors.gray.100}' },
				},
				'fg.muted': {
					value: { base: '{colors.gray.700}', _dark: '{colors.gray.200}' },
				},
				'border.subtle': {
					value: { base: '{colors.gray.200}', _dark: '{colors.gray.700}' },
				},
				'link.default': {
					value: { base: '{colors.blue.700}', _dark: '{colors.blue.500}' },
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, themeConfig);
