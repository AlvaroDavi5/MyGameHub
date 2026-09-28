import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
	index('pages/home.tsx'),
	layout('components/base/require-steam-user.tsx', [
		route('/profile-search', 'pages/profile-search/profile-search.tsx'),
		route('/game-search', 'pages/game-search/game-search.tsx'),
		route('/my-games', 'pages/my-games/my-games.tsx'),
		route('/my-games/:appId', 'pages/my-games/game-details/game-details.tsx'),
	]),
] satisfies RouteConfig;
