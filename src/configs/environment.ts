function getEnvVariable(name: string, defaultValue?: string): string {
	const value = process.env[name] ?? defaultValue;
	if (value === undefined) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}

export const environment = {
	appPort: Number(getEnvVariable('PORT', '3001')),
	steamApiKey: getEnvVariable('STEAM_API_KEY', ''),
} as const;
