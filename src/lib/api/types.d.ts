interface IResolveVanityURLResponse {
	response: {
		success: number;
		steamid?: string;
		message?: string;
	};
}

interface IGetPlayerSummariesResponse {
	response: {
		players: {
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
		}[];
	};
}

type SuccessOrErrorResponse<T> =
	| {
			data: T;
			error?: undefined;
	  }
	| {
			error: string;
			data?: undefined;
	  };

interface IGetSteamIdByUsernameResponse {
	steamId: string;
}

interface IGetPlayerStatsBySteamIdResponse {
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
