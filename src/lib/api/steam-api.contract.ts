export interface IGetSteamIdByUsernameResponse {
	steamId: string;
}

export interface IGetPlayerStatsBySteamIdResponse {
	steamId: string;
	personaName: string;
	realName: string;
	countryCode: string;
	avatar: string;
	profileUrl: string;
}

interface IOwnedGame {
	appId: number;
	name: string;
	imageUrl: string;
	playtime: number;
}

export interface IGetOwnedGamesResponse {
	games: IOwnedGame[];
}

export interface IGetGameAchievementsFilter {
	appId: string;
	steamId: string;
	// language code for the game data: 'english', 'french', 'brazilian'...
	lang: string;
}

export interface IGameAchievement {
	apiName: string;
	name: string;
	description?: string | undefined;
	icon: string;
	achieved: boolean;
	hidden: boolean;
}

export interface IGetGameAchievementsResponse {
	gameName: string;
	achievements: IGameAchievement[];
}
