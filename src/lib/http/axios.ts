import { create as createInstance, type AxiosInstance } from 'axios';

export function createAxiosInstance(baseURL: string, timeout: number, fixedParams: Record<string, unknown>): AxiosInstance {
	return createInstance({
		baseURL,
		params: fixedParams,
		timeout,
	});
}
