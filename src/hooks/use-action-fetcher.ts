import { useFetcher, type FetcherSubmitOptions, type SubmitTarget } from 'react-router';

interface UseActionFetcherOptions {
	key?: string;
}

interface UseActionFetcherResult<TAction, TPayload extends object> {
	isPending: boolean;
	data: ReturnType<typeof useFetcher<TAction>>['data'];
	submit: (payload: TPayload, options?: FetcherSubmitOptions) => void;
}

const DEFAULT_SUBMIT_OPTIONS: FetcherSubmitOptions = { method: 'post' };

/**
 * Generic wrapper around `useFetcher`: `TAction` types `data` after the route's
 * action, and `TPayload` types the exact shape each page's `submit` accepts —
 * so every usage gets its own correct typing instead of a shared `any`.
 **/
export function useActionFetcher<TAction, TPayload extends object>(fetcherOptions?: UseActionFetcherOptions): UseActionFetcherResult<TAction, TPayload> {
	const fetcher = useFetcher<TAction>(fetcherOptions);

	const isPending = fetcher.state !== 'idle';

	const submit = (payload: TPayload, options: FetcherSubmitOptions = DEFAULT_SUBMIT_OPTIONS): void => {
		fetcher.submit(payload as SubmitTarget, options);
	};

	return { isPending, data: fetcher.data, submit };
}
