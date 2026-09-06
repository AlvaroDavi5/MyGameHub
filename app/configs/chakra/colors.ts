import { defineConfig } from '@chakra-ui/react';

/**
 * Single source of truth for every color used across the app.
 * Re-theming the whole UI only requires editing the raw `brand` scale
 * and the semantic tokens below — no component should hardcode a color.
 **/
export const colorsConfig = defineConfig({
	theme: {
		tokens: {
			colors: {
				brand: {
					50: { value: '#eef6ff' },
					100: { value: '#d9ecff' },
					200: { value: '#bcdcff' },
					300: { value: '#8ec4ff' },
					400: { value: '#59a4ff' },
					500: { value: '#3182f6' },
					600: { value: '#1f66db' },
					700: { value: '#1a51b0' },
					800: { value: '#1a4489' },
					900: { value: '#1a3a6e' },
					950: { value: '#122446' },
				},
			},
		},
		semanticTokens: {
			colors: {
				'bg.canvas': {
					value: { base: '{colors.white}', _dark: '{colors.gray.950}' },
				},
				'bg.header': {
					value: { base: '{colors.brand.600}', _dark: '{colors.brand.900}' },
				},
				'bg.drawer': {
					value: { base: '{colors.brand.600}', _dark: '{colors.brand.900}' },
				},
				'bg.card': {
					value: { base: '{colors.white}', _dark: '{colors.gray.800}' },
				},
				'bg.card.hover': {
					value: { base: '{colors.brand.50}', _dark: '{colors.gray.700}' },
				},
				'fg.default': {
					value: { base: '{colors.gray.800}', _dark: '{colors.gray.100}' },
				},
				'fg.muted': {
					value: { base: '{colors.gray.700}', _dark: '{colors.gray.200}' },
				},
				'fg.onAccent': {
					value: { base: '{colors.white}', _dark: '{colors.white}' },
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
