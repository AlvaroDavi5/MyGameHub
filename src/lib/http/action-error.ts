import { HttpError } from './http-error';
import { HttpStatusEnum } from './http-status.enum';

const UNKNOWN_ERROR_MESSAGE = 'Ocorreu um erro desconhecido ao processar a requisição';

interface ActionErrorResult {
	error: {
		statusCode: number;
		message: string;
	};
}

/**
 * Normalizes any error caught by a route action/loader into the standard
 * `{ error: { statusCode, message } }` shape. Every action should funnel its
 * catch block through this so the global toast handler can react to it the
 * same way no matter which route or client threw.
 **/
export function toActionErrorResult(error: unknown): ActionErrorResult {
	if (error instanceof HttpError) {
		return { error: { statusCode: error.statusCode, message: error.message } };
	}

	if (error instanceof Error) {
		return { error: { statusCode: HttpStatusEnum.INTERNAL_SERVER_ERROR, message: error.message } };
	}

	return { error: { statusCode: HttpStatusEnum.INTERNAL_SERVER_ERROR, message: UNKNOWN_ERROR_MESSAGE } };
}

/**
 * Type guard for the standard action-error shape, shared by every place that
 * needs to detect it (the global toaster, route components, tests).
 **/
export function isActionErrorResult(value: unknown): value is ActionErrorResult {
	if (!value || typeof value !== 'object' || !('error' in value)) {
		return false;
	}

	const { error } = value as { error: unknown };

	return (
		!!error &&
		typeof error === 'object' &&
		typeof (error as { statusCode: unknown }).statusCode === 'number' &&
		typeof (error as { message: unknown }).message === 'string'
	);
}
