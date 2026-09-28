import { useEffect, useRef } from 'react';
import { useActionFetcher } from '@hooks/use-action-fetcher';
import type { myGamesAction } from '../my-games.action';

interface OwnedGamesPayload {
	steamId: string;
}

interface UseOwnedGamesResult {
	isLoading: boolean;
	result: ReturnType<typeof useActionFetcher<typeof myGamesAction, OwnedGamesPayload>>['data'];
}

export function useOwnedGames(steamId: string): UseOwnedGamesResult {
	const { isPending, data, submit } = useActionFetcher<typeof myGamesAction, OwnedGamesPayload>();
	const hasRequestedRef = useRef(false);

	useEffect(() => {
		if (hasRequestedRef.current) {
			return;
		}
		hasRequestedRef.current = true;
		submit({ steamId });
	}, [steamId, submit]);

	return { isLoading: isPending, result: data };
}
