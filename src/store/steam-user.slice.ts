import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SteamUserState {
	steamId: string | null;
}

const initialState: SteamUserState = {
	steamId: null,
};

const steamUserSlice = createSlice({
	name: 'steamUser',
	initialState,
	reducers: {
		setSteamId(state, action: PayloadAction<string>) {
			state.steamId = action.payload;
		},
		clearSteamId(state) {
			state.steamId = null;
		},
	},
});

export const { setSteamId, clearSteamId } = steamUserSlice.actions;
export const steamUserReducer = steamUserSlice.reducer;
