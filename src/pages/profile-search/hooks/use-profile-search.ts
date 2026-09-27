import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import { toaster } from '@components/chakra/toaster';
import type { profileSearchAction } from '../profile-search.action';

interface UseProfileSearchResult {
	isSearching: boolean;
	result: ReturnType<typeof useFetcher<typeof profileSearchAction>>['data'];
	search: (username: string) => void;
}

export function useProfileSearch(): UseProfileSearchResult {
	const fetcher = useFetcher<typeof profileSearchAction>();

	const isSearching = fetcher.state !== 'idle';
	const result = fetcher.data;

	useEffect(() => {
		if (result && 'error' in result && result.error) {
			toaster.error({
				title: 'Erro na pesquisa',
				description: result.error,
			});

			return;
		}
	}, [result]);

	const search = (username: string): void => {
		fetcher.submit({ username }, { method: 'post' });
	};

	return { isSearching, result, search };
}
