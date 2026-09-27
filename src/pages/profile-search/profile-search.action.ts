import type { ActionFunctionArgs } from 'react-router';
import { SteamApiClient } from '@lib/api/steam-api';

export type ProfileSearchActionResult = Awaited<ReturnType<typeof profileSearchAction>>;

export async function profileSearchAction({ request }: ActionFunctionArgs) {
	const steamClient = new SteamApiClient();
	const formData = await request.formData();
	const username = String(formData.get('username') ?? '').trim();

	try {
		let steamId = username;

		const isUsernameSteamId = /^\d+$/.test(username);
		if (!isUsernameSteamId) {
			const steamIdRes = await steamClient.getSteamIdByUsername(username);
			if ('error' in steamIdRes) {
				return { error: steamIdRes.error };
			}
			steamId = steamIdRes.data.steamId;
		}

		const playerRes = await steamClient.getPlayerStatsBySteamId(steamId);
		if ('error' in playerRes) {
			return { error: playerRes.error };
		}
		return { data: playerRes.data };
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: 'Ocorreu um erro desconhecido ao pesquisar o perfil' };
	}
}
