export interface IGetSteamIdByUsernameResponse {
	steamId: string;
}

export interface IGetPlayerStatsBySteamIdResponse {
	steamid: string;
	communityvisibilitystate: number;
	profilestate: number;
	personaname: string;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	avatarhash: string;
	lastlogoff: number;
	personastate: number;
	realname: string;
	primaryclanid: string;
	timecreated: number;
	personastateflags: number;
	loccountrycode: string;
}

export interface IGetGameDataFilter {
	appId: string;
	// language code for the game data: 'english', 'french', 'brazilian'...
	lang: string;
}

export interface IGetGameDataResponse {
	achievements: {
		name: string;
	}[];
}
