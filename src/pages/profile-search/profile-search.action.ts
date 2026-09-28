import type { ActionFunctionArgs } from 'react-router';
import { steamApiClient } from '@lib/api/steam-api-client';
import { toActionErrorResult } from '@lib/http/action-error';

export async function profileSearchAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const username = String(formData.get('username') ?? '').trim();

	try {
		let steamId = username;

		const alreadyIsSteamId = /^\d+$/.test(username);
		if (!alreadyIsSteamId) {
			const { steamId: resolvedSteamId } = await steamApiClient.getSteamIdByUsername(username);
			steamId = resolvedSteamId;
		}

		const player = await steamApiClient.getPlayerStatsBySteamId(steamId);
		return { data: player };
	} catch (error) {
		return toActionErrorResult(error);
	}
}
