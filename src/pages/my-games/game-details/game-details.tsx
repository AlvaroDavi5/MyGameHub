import type { ReactElement } from 'react';
import { useParams } from 'react-router';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useAppSelector } from '@store/hooks';
import { selectSteamId } from '@store/steam-user.selectors';
import { AchievementItem } from './components/achievement-item';
import { useGameAchievements } from './hooks/use-game-achievements';

export { gameDetailsAction as action } from './game-details.action';

export function meta(): { title: string }[] {
	return [{ title: 'Detalhes do Jogo' }];
}

export default function GameDetails(): ReactElement {
	const steamId = useAppSelector(selectSteamId) ?? '';
	const { appId = '' } = useParams<{ appId: string }>();
	const { isLoading, result } = useGameAchievements(steamId, appId);

	const gameImageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

	return (
		<Box padding={8}>
			{isLoading && <Text>Carregando conquistas...</Text>}
			{!isLoading && result && 'data' in result && result.data && (
				<>
					<Flex direction="column" align="center" gap={4} marginBottom={8}>
						<Image src={gameImageUrl} alt={result.data.gameName} maxWidth="460px" borderRadius="md" />
						<Heading as="h2" size="lg">
							{result.data.gameName}
						</Heading>
					</Flex>

					<Flex direction="column" gap={2} maxWidth="600px" marginX="auto">
						{result.data.achievements.map((achievement) => (
							<AchievementItem key={achievement.apiName} achievement={achievement} />
						))}
					</Flex>
				</>
			)}
		</Box>
	);
}
