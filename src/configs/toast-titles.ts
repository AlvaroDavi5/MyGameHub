import { HttpStatusEnum } from '@lib/http/http-status.enum';

/**
 * Toast titles per HTTP status code (in Portuguese). Extend this map to
 * customize more codes — anything missing falls back to a generic title
 * derived from the status class (4xx/5xx) in `getHttpErrorTitle`.
 **/
const HTTP_STATUS_TITLES: Record<number, string> = {
	[HttpStatusEnum.BAD_REQUEST]: 'Requisição inválida',
	[HttpStatusEnum.UNAUTHORIZED]: 'Não autenticado',
	[HttpStatusEnum.FORBIDDEN]: 'Acesso negado',
	[HttpStatusEnum.NOT_FOUND]: 'Não encontrado',
	[HttpStatusEnum.TOO_MANY_REQUESTS]: 'Muitas requisições simultâneas',
	[HttpStatusEnum.INVALID_TOKEN]: 'Token inválido',
	[HttpStatusEnum.INTERNAL_SERVER_ERROR]: 'Erro interno do servidor',
	[HttpStatusEnum.BAD_GATEWAY]: 'Serviço indisponível',
	[HttpStatusEnum.SERVICE_UNAVAILABLE]: 'Serviço indisponível',
};

const GENERIC_SERVER_ERROR_TITLE = 'Erro no servidor';
const GENERIC_CLIENT_ERROR_TITLE = 'Erro na requisição';
const GENERIC_UNKNOWN_ERROR_TITLE = 'Erro inesperado';

export function getHttpErrorTitle(statusCode: number): string {
	const knownTitle = HTTP_STATUS_TITLES[statusCode];
	if (knownTitle) {
		return knownTitle;
	}

	if (statusCode >= 500) {
		return GENERIC_SERVER_ERROR_TITLE;
	}

	if (statusCode >= 400) {
		return GENERIC_CLIENT_ERROR_TITLE;
	}

	return GENERIC_UNKNOWN_ERROR_TITLE;
}
