import { useActionFetcher } from '@hooks/use-action-fetcher';
import type { profileSearchAction } from '../profile-search.action';

interface ProfileSearchPayload {
	username: string;
}

interface UseProfileSearchResult {
	isSearching: boolean;
	result: ReturnType<typeof useActionFetcher<typeof profileSearchAction, ProfileSearchPayload>>['data'];
	search: (username: string) => void;
}

export function useProfileSearch(): UseProfileSearchResult {
	const { isPending, data, submit } = useActionFetcher<typeof profileSearchAction, ProfileSearchPayload>();

	const search = (username: string): void => {
		submit({ username }, { method: 'post' });
	};

	return { isSearching: isPending, result: data, search };
}
