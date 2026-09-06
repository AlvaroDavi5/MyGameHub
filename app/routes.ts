import { type RouteConfig, index } from '@react-router/dev/routes';

export default [
	index('pages/home.tsx'),
	{
		file: 'pages/profile-search.tsx',
		path: '/profile-search',
	},
	{
		file: 'pages/game-search.tsx',
		path: '/game-search',
	},
	{
		file: 'pages/my-games.tsx',
		path: '/my-games',
	},
] satisfies RouteConfig;
