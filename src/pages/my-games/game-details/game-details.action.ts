import type { ActionFunctionArgs } from 'react-router';
import { steamApiClient } from '@lib/api/steam-api-client';
import { toActionErrorResult } from '@lib/http/action-error';

const LANGUAGE = 'brazilian';

export async function gameDetailsAction({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const steamId = String(formData.get('steamId') ?? '').trim();
	const appId = String(formData.get('appId') ?? '').trim();

	try {
		const gameAchievements = await steamApiClient.getGameAchievements({ steamId, appId, lang: LANGUAGE });
		return { data: gameAchievements };
	} catch (error) {
		return toActionErrorResult(error);
	}
}
