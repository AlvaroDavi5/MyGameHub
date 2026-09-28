import { configureStore } from '@reduxjs/toolkit';
import { steamUserReducer } from './steam-user.slice';

export function createAppStore() {
	return configureStore({
		reducer: {
			steamUser: steamUserReducer,
		},
	});
}

type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
