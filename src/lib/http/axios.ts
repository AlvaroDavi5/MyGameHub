import { create as createInstance, isAxiosError, type AxiosError, type AxiosInstance } from 'axios';
import { HttpError } from './http-error';
import { HttpStatusEnum } from './http-status.enum';

function extractResponseMessage(error: AxiosError): string | undefined {
	const data = error.response?.data;
	const hasMessage = !!data && typeof data === 'object' && 'message' in data && typeof (data as { message: unknown }).message === 'string';
	return hasMessage ? (data as { message: string }).message : undefined;
}

/**
 * Every axios instance created here rejects with a single `HttpError` shape
 * (statusCode + message), regardless of the client that made the request or
 * which route triggered it — this is what lets a single global toast handler
 * react consistently to any HTTP exception, on any route.
 **/
export function createAxiosInstance(baseURL: string, timeout: number, fixedParams: Record<string, unknown>): AxiosInstance {
	const instance = createInstance({
		baseURL,
		params: fixedParams,
		timeout,
	});

	instance.interceptors.response.use(
		(response) => response,
		(error: unknown) => {
			if (isAxiosError(error)) {
				const statusCode = error.response?.status ?? HttpStatusEnum.SERVICE_UNAVAILABLE;
				const message = extractResponseMessage(error) ?? error.message;
				return Promise.reject(new HttpError(statusCode, message));
			}
			return Promise.reject(error);
		}
	);

	return instance;
}
