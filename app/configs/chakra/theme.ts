import { createSystem, defaultConfig, defineConfig, mergeConfigs } from '@chakra-ui/react';
import { colorsConfig } from './colors';

const fontStack = '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

/**
 * Theme configuration: design tokens only, no component code.
 * Colors live in `./colors` so a full re-theme only touches that file.
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
	},
});

export const system = createSystem(defaultConfig, mergeConfigs(themeConfig, colorsConfig));
