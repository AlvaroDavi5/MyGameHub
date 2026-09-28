import type { ReactElement } from 'react';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

interface MiniProfileViewProps {
	personaName: string;
	profileUrl: string;
	avatarSrc: string;
	realName?: string | undefined;
	countryCode?: string | undefined;
}

export function MiniProfileView({ personaName, realName, countryCode, avatarSrc, profileUrl }: MiniProfileViewProps): ReactElement {
	return (
		<Box padding={3} borderWidth={1} borderRadius="md" maxWidth="320px" width="full">
			<Flex alignItems="center" gap={3}>
				<Image src={avatarSrc} alt={`${personaName}'s avatar`} boxSize="56px" borderRadius="full" />
				<Box>
					<Text fontWeight="bold">{personaName}</Text>
					{realName && <Text fontSize="sm">{realName}</Text>}
					{countryCode && <Text fontSize="sm">{countryCode}</Text>}
					<Link href={profileUrl} color="blue.500" fontSize="sm">
						Ver perfil
					</Link>
				</Box>
			</Flex>
		</Box>
	);
}
