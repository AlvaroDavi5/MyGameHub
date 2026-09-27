import { useEffect, useRef } from 'react';
import { useFetchers } from 'react-router';
import { toaster } from '@components/chakra/toaster';
import { getHttpErrorTitle } from '@configs/toast-titles';
import { isActionErrorResult } from '@lib/http/action-error';

/**
 * Mounted once at the app root (see `PageBase`). Watches every fetcher across
 * every route and, the moment one settles with the standard `{ error }` shape,
 * shows a toast titled by its HTTP status code — so no page has to wire its
 * own error-toast handling per request; it's covered app-wide by convention.
 **/
export function HttpErrorToaster(): null {
	const fetchers = useFetchers();
	const notifiedData = useRef(new WeakSet<object>());

	useEffect(() => {
		for (const fetcher of fetchers) {
			if (fetcher.state !== 'idle') {
				continue;
			}

			const { data } = fetcher;
			if (!data || typeof data !== 'object' || !isActionErrorResult(data) || notifiedData.current.has(data)) {
				continue;
			}

			notifiedData.current.add(data);
			toaster.error({
				title: getHttpErrorTitle(data.error.statusCode),
				description: data.error.message,
			});
		}
	}, [fetchers]);

	return null;
}
