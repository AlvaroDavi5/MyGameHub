import type { ActionFunctionArgs } from 'react-router';
import { steamApiClient } from '@lib/api/steam-api-client';
import { toActionErrorResult } from '@lib/http/action-error';

export async function myGamesAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const steamId = String(formData.get('steamId') ?? '').trim();

	try {
		const ownedGames = await steamApiClient.getOwnedGames(steamId);
		return { data: ownedGames };
	} catch (error) {
		return toActionErrorResult(error);
	}
}
