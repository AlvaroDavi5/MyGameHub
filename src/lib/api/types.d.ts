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
