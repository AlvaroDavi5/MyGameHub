import type { ActionFunctionArgs } from 'react-router';
import { SteamApiClient } from '@lib/api/steam-api.client';
import { toActionErrorResult } from '@lib/http/action-error';

export type ProfileSearchActionResult = Awaited<ReturnType<typeof profileSearchAction>>;

export async function profileSearchAction({ request }: ActionFunctionArgs) {
	const steamClient = new SteamApiClient();
	const formData = await request.formData();
	const username = String(formData.get('username') ?? '').trim();

	try {
		let steamId = username;

		const isUsernameSteamId = /^\d+$/.test(username);
		if (!isUsernameSteamId) {
			const { steamId: resolvedSteamId } = await steamClient.getSteamIdByUsername(username);
			steamId = resolvedSteamId;
		}

		const player = await steamClient.getPlayerStatsBySteamId(steamId);
		return { data: player };
	} catch (error) {
		return toActionErrorResult(error);
	}
}
