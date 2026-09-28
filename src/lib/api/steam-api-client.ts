import type { AxiosInstance } from 'axios';
import { environment } from '@configs/environment';
import { HttpError } from '../http/http-error';
import { createAxiosInstance } from '../http/axios';
import type {
	IGetGameAchievementsFilter,
	IGetGameAchievementsResponse,
	IGetOwnedGamesResponse,
	IGetPlayerStatsBySteamIdResponse,
	IGetSteamIdByUsernameResponse,
} from './steam-api.contract';
import { HttpStatusEnum } from '@lib/http/http-status.enum';

class SteamApiClient {
	private client: AxiosInstance;
	private readonly AXIOS_TIMEOUT = 60000;
	private readonly API_KEY = environment.steamApiKey;
	public readonly BASE_URL = 'https://api.steampowered.com';

	constructor() {
		this.client = createAxiosInstance(this.BASE_URL, this.AXIOS_TIMEOUT, { key: this.API_KEY, format: 'json' });
	}

	public async getSteamIdByUsername(username: string): Promise<IGetSteamIdByUsernameResponse> {
		const { data } = await this.client.get<IResolveVanityURLRawResponse>(`/ISteamUser/ResolveVanityURL/v1/?vanityurl=${encodeURIComponent(username)}`, {
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
		const { data } = await this.client.get<IGetPlayerSummariesRawResponse>(`/ISteamUser/GetPlayerSummaries/v2/`, {
			params: { steamids: steamId },
		});

		const [player] = data.response.players;
		if (!player) {
			throw new HttpError(HttpStatusEnum.NOT_FOUND, 'Player não encontrado');
		}

		return {
			steamId: player.steamid,
			personaName: player.personaname,
			realName: player.realname,
			countryCode: player.loccountrycode,
			avatar: player.avatarfull,
			profileUrl: player.profileurl,
		};
	}

	public async getOwnedGames(steamId: string): Promise<IGetOwnedGamesResponse> {
		const { data } = await this.client.get<IGetOwnedGamesRawResponse>(`/IPlayerService/GetOwnedGames/v1/`, {
			params: { steamid: steamId, include_appinfo: true, include_played_free_games: true },
		});
		const games = data?.response?.games ?? [];
		return {
			games: games.map((game) => ({
				appId: game.appid,
				name: game.name,
				imageUrl: this.buildGameImageUrl(game.appid),
				playtime: game.playtime_forever ?? 0,
			})),
		};
	}

	public async getGameAchievements(filter: IGetGameAchievementsFilter): Promise<IGetGameAchievementsResponse> {
		const [{ data: schemaResponse }, { data: playerAchievementsResponse }] = await Promise.all([
			this.client.get<IGetSchemaForGameRawResponse>(`/ISteamUserStats/GetSchemaForGame/v2/`, {
				params: { appid: filter.appId, l: filter.lang },
			}),
			this.client.get<IGetPlayerAchievementsRawResponse>(`/ISteamUserStats/GetPlayerAchievements/v1/`, {
				params: { steamid: filter.steamId, appid: filter.appId, l: filter.lang },
			}),
		]);

		if (!schemaResponse?.game?.gameName) {
			throw new HttpError(HttpStatusEnum.NOT_FOUND, 'Dados do jogo não encontrados');
		}

		const schemaAchievements = schemaResponse?.game.availableGameStats?.achievements ?? [];
		const achievedByApiName = new Map(
			(playerAchievementsResponse.playerstats.achievements ?? []).map((achievement) => [achievement.apiname, achievement.achieved === 1])
		);

		const achievements = schemaAchievements.map((achievement) => {
			const achieved = achievedByApiName.get(achievement.name) ?? false;
			const icon = achieved ? achievement.icon : (achievement.icongray ?? achievement.icon);
			return {
				apiName: achievement.name,
				name: achievement.displayName,
				description: achievement.description,
				hidden: achievement.hidden === 1,
				achieved,
				icon,
			};
		});

		return { gameName: schemaResponse.game.gameName, achievements };
	}

	private buildGameImageUrl(appId: number): string {
		return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;
	}
}

export const steamApiClient = new SteamApiClient();
