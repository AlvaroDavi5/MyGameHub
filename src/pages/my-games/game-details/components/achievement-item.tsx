import { useState, type ReactElement } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import type { IGameAchievement } from '@lib/api/steam-api.contract';

interface AchievementItemProps {
	achievement: IGameAchievement;
}

export function AchievementItem({ achievement }: AchievementItemProps): ReactElement {
	const isSpoiler = achievement.hidden && !achievement.achieved;

	const [isAchievementHidden, setAchievementHidden] = useState(isSpoiler);

	const handleMouseEnter = () => {
		if (isSpoiler) {
			setAchievementHidden(false);
		}
	};
	const handleMouseLeave = () => {
		if (isSpoiler) {
			setAchievementHidden(true);
		}
	};

	return (
		<Flex align="center" gap={3} padding={2} borderWidth="1px" borderColor="border.subtle" borderRadius="md" opacity={achievement.achieved ? 1 : 0.7}>
			<Image
				src={achievement.icon}
				filter={achievement.achieved ? 'none' : 'grayscale(100%)'}
				alt={isAchievementHidden ? 'Conquista secreta' : achievement.name}
				boxSize="48px"
				borderRadius="sm"
			/>
			<Box
				filter={isAchievementHidden ? 'blur(6px)' : undefined}
				userSelect={isAchievementHidden ? 'none' : 'auto'}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Text fontWeight="bold">{achievement.name}</Text>
				{!!achievement.description && (
					<Text fontSize="sm" color="fg.muted">
						{achievement.description}
					</Text>
				)}
			</Box>
		</Flex>
	);
}
