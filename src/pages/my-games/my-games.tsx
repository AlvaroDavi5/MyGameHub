import type { ReactElement } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { FeatureCard } from '@components/cards/feature-card';
import { useAppSelector } from '@store/hooks';
import { selectSteamId } from '@store/steam-user.selectors';
import type { Route } from './+types/my-games';
import { useOwnedGames } from './hooks/use-owned-games';

export { myGamesAction as action } from './my-games.action';

export function meta(_args: Route.MetaArgs) {
	return [{ title: 'Meus Jogos' }];
}

export default function MyGames(): ReactElement {
	const steamId = useAppSelector(selectSteamId) ?? '';
	const { isLoading, result } = useOwnedGames(steamId);

	return (
		<Flex wrap="wrap" justify="center" align="center" gap={8} padding={8} minH="calc(100vh - 72px)">
			{isLoading && <Text>Carregando jogos...</Text>}
			{!isLoading &&
				result &&
				'data' in result &&
				result.data &&
				result.data.games
					// oxlint-disable-next-line unicorn/no-array-sort
					.sort((a, b) => b.playtime - a.playtime)
					.map((game) => (
						<FeatureCard key={game.appId} to={`/my-games/${game.appId}`} imgSrc={game.imageUrl} imgAlt={game.name}>
							{game.name}
						</FeatureCard>
					))}
		</Flex>
	);
}
