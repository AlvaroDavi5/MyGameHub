import { useFetcher } from 'react-router';
import type { profileSearchAction } from '../profile-search.action';

interface UseProfileSearchResult {
	isSearching: boolean;
	result: ReturnType<typeof useFetcher<typeof profileSearchAction>>['data'];
	search: (username: string) => void;
}

/**
 * Wires the profile-search route action through a fetcher. Request failures
 * are not handled here — they're caught and surfaced as a toast app-wide by
 * `HttpErrorToaster`, which watches every fetcher's settled data.
 **/
export function useProfileSearch(): UseProfileSearchResult {
	const fetcher = useFetcher<typeof profileSearchAction>();

	const isSearching = fetcher.state !== 'idle';
	const result = fetcher.data;

	const search = (username: string): void => {
		fetcher.submit({ username }, { method: 'post' });
	};

	return { isSearching, result, search };
}
