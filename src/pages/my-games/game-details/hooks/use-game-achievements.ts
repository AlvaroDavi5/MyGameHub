import { useEffect, useRef } from 'react';
import { useActionFetcher } from '@hooks/use-action-fetcher';
import type { gameDetailsAction } from '../game-details.action';

interface GameAchievementsPayload {
	steamId: string;
	appId: string;
}

interface UseGameAchievementsResult {
	isLoading: boolean;
	result: ReturnType<typeof useActionFetcher<typeof gameDetailsAction, GameAchievementsPayload>>['data'];
}

export function useGameAchievements(steamId: string, appId: string): UseGameAchievementsResult {
	const { isPending, data, submit } = useActionFetcher<typeof gameDetailsAction, GameAchievementsPayload>();
	const hasRequestedRef = useRef(false);

	useEffect(() => {
		if (hasRequestedRef.current) {
			return;
		}
		hasRequestedRef.current = true;
		submit({ steamId, appId });
	}, [steamId, appId, submit]);

	return { isLoading: isPending, result: data };
}
