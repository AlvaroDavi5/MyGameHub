/**
 * Normalized shape every HTTP client in `@lib` throws on failure, so callers
 * (route actions/loaders) only ever need to handle one error type regardless
 * of which underlying request or client raised it.
 **/
export class HttpError extends Error {
	public readonly statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);
		this.name = 'HttpError';
		this.statusCode = statusCode;
	}
}
