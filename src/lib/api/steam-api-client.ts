import type { AxiosInstance } from 'axios';
import { environment } from '@configs/environment';
import { HttpError } from '../http/http-error';
import { createAxiosInstance } from '../http/axios';
import type { IGetGameDataFilter, IGetGameDataResponse, IGetPlayerStatsBySteamIdResponse, IGetSteamIdByUsernameResponse } from './steam-api.contract';
import { HttpStatusEnum } from '@lib/http/http-status.enum';

export class SteamApiClient {
	private client: AxiosInstance;
	private readonly AXIOS_TIMEOUT = 60000;
	private readonly API_KEY = environment.steamApiKey;
	public readonly BASE_URL = 'https://api.steampowered.com';

	constructor() {
		this.client = createAxiosInstance(this.BASE_URL, this.AXIOS_TIMEOUT, { key: this.API_KEY, format: 'json' });
	}

	public async getSteamIdByUsername(username: string): Promise<IGetSteamIdByUsernameResponse> {
		const { data } = await this.client.get<IResolveVanityURLResponse>(`/ISteamUser/ResolveVanityURL/v1/?vanityurl=${encodeURIComponent(username)}`, {
			params: {
				vanityurl: username,
			},
		});
		if (!data.response.steamid) {
			throw new HttpError(HttpStatusEnum.NOT_FOUND, data.response.message || 'SteamID não encontrado');
		}
		return { steamId: data.response.steamid };
	}

	public async getPlayerStatsBySteamId(steamId: string): Promise<IGetPlayerStatsBySteamIdResponse> {
		const { data } = await this.client.get<IGetPlayerSummariesResponse>(`/ISteamUser/GetPlayerSummaries/v2/`, {
			params: { steamids: steamId },
		});
		const [player] = data.response.players;
		if (!player) {
			throw new HttpError(HttpStatusEnum.NOT_FOUND, 'Player não encontrado');
		}
		return player;
	}

	public async getSchemaForGame(filter: IGetGameDataFilter): Promise<IGetGameDataResponse> {
		const { data } = await this.client.get<IGetSchemaForGameResponse>(`/ISteamUserStats/GetSchemaForGame/v2/`, {
			params: { appid: filter.appId, l: filter.lang },
		});
		if (!data.game.gameName) {
			throw new HttpError(HttpStatusEnum.NOT_FOUND, 'Dados do jogo não encontrados');
		}
		const achievements = data.game.availableGameStats.achievements.map((achievement) => ({ name: achievement.displayName }));
		return { achievements };
	}
}
