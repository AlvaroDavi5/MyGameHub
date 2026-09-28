import { useEffect, useRef } from 'react';
import { useFetcher, type FetcherSubmitOptions, type SubmitTarget } from 'react-router';
import { toaster } from '@components/chakra/toaster';
import { getHttpErrorTitle } from '@configs/toast-titles';
import { isActionErrorResult } from '@lib/http/action-error';

const DEFAULT_SUBMIT_OPTIONS: FetcherSubmitOptions = { method: 'post' };

interface UseActionFetcherOptions {
	key?: string;
}

interface UseActionFetcherResult<TAction, TPayload extends object> {
	isPending: boolean;
	data: ReturnType<typeof useFetcher<TAction>>['data'];
	submit: (payload: TPayload, options?: FetcherSubmitOptions) => void;
}

/**
 * Generic wrapper around `useFetcher`: `TAction` types `data` after the route's
 * action, and `TPayload` types the exact shape each page's `submit` accepts —
 * so every usage gets its own correct typing instead of a shared `any`.
 *
 * Also shows the HTTP-error toast itself, reading from this fetcher's own
 * `data`.
 **/
export function useActionFetcher<TAction, TPayload extends object>(fetcherOptions?: UseActionFetcherOptions): UseActionFetcherResult<TAction, TPayload> {
	const fetcher = useFetcher<TAction>(fetcherOptions);
	const notifiedDataRef = useRef<unknown>(null);

	const isPending = fetcher.state !== 'idle';
	const fetcherData = fetcher.data;

	useEffect(() => {
		if (isPending || !fetcherData || notifiedDataRef.current === fetcherData || !isActionErrorResult(fetcherData)) {
			return;
		}

		notifiedDataRef.current = fetcherData;
		toaster.error({
			closable: true,
			title: getHttpErrorTitle(fetcherData.error.statusCode),
			description: fetcherData.error.message,
		});
	}, [fetcherData, isPending]);

	const submit = (payload: TPayload, options: FetcherSubmitOptions = DEFAULT_SUBMIT_OPTIONS): void => {
		fetcher.submit(payload as SubmitTarget, options);
	};

	return { isPending, data: fetcher.data, submit };
}
