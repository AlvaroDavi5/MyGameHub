interface IResolveVanityURLRawResponse {
	response: {
		success: number;
		steamid?: string;
		message?: string;
	};
}

interface IGetPlayerSummariesRawResponse {
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

interface IGetOwnedGamesRawResponse {
	response: {
		game_count: number;
		games?: {
			appid: number;
			name: string;
			playtime_forever: number;
			img_icon_url: string;
			has_community_visible_stats?: boolean;
			playtime_windows_forever?: number;
			playtime_mac_forever?: number;
			playtime_linux_forever?: number;
			playtime_deck_forever?: number;
			rtime_last_played: number;
			has_leaderboards?: boolean;
			playtime_disconnected: number;
			content_descriptorids?: number[];
		}[];
	};
}

interface IGetSchemaForGameRawResponse {
	game: {
		gameName: string;
		gameVersion: string;
		availableGameStats?: {
			stats?: {
				name: string;
				defaultvalue: number;
				displayName: string;
			}[];
			achievements?: {
				name: string;
				defaultvalue: number;
				displayName: string;
				hidden: number;
				icon: string;
				icongray: string;
				description?: string;
			}[];
		};
	};
}

interface IGetBadgesRawResponse {
	response: {
		badges?: {
			badgeid: number;
			level: number;
			completion_time: number;
			xp: number;
			scarcity: number;
			appid?: number;
		}[];
		player_xp: number;
		player_level: number;
		player_xp_needed_to_level_up: number;
		player_xp_needed_current_level: number;
	};
}

interface IGetPlayerAchievementsRawResponse {
	playerstats: {
		steamID: string;
		gameName: string;
		achievements?: {
			apiname: string;
			achieved: number;
			unlocktime: number;
		}[];
		success: boolean;
		error?: string;
	};
}
