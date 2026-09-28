import type { RootState } from './store';

export function selectSteamId(state: RootState): string | null {
	return state.steamUser.steamId;
}

export function selectHasSteamUser(state: RootState): boolean {
	return state.steamUser.steamId !== null;
}
