import type { AxiosInstance } from 'axios';
import { environment } from '@configs/environment';
import { createAxiosInstance } from '../http/axios';

export class SteamApiClient {
	private client: AxiosInstance;
	private readonly AXIOS_TIMEOUT = 60000;
	private readonly API_KEY = environment.steamApiKey;
	public readonly BASE_URL = 'https://api.steampowered.com';

	constructor() {
		this.client = createAxiosInstance(this.BASE_URL, this.AXIOS_TIMEOUT, { key: this.API_KEY, format: 'json' });
	}

	public async getSteamIdByUsername(username: string): Promise<SuccessOrErrorResponse<IGetSteamIdByUsernameResponse>> {
		const { data } = await this.client.get<IResolveVanityURLResponse>(`/ISteamUser/ResolveVanityURL/v1/?vanityurl=${encodeURIComponent(username)}`, {
			params: {
				vanityurl: username,
			},
		});
		if (data.response.steamid) {
			return { data: { steamId: data.response.steamid } };
		}
		return { error: data.response.message || 'SteamID não encontrado' };
	}

	public async getPlayerStatsBySteamId(steamId: string): Promise<SuccessOrErrorResponse<IGetPlayerStatsBySteamIdResponse>> {
		const { data } = await this.client.get<IGetPlayerSummariesResponse>(`/ISteamUser/GetPlayerSummaries/v0002/`, {
			params: { steamids: steamId },
		});
		if (data.response.players.length > 0) {
			return { data: data.response.players[0] };
		}
		return { error: 'Player não encontrado' };
	}
}
