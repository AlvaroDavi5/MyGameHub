import type { ReactElement } from 'react';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

interface ProfileViewProps {
	personaName: string;
	profileUrl: string;
	avatarSrc: string;
	realName?: string | undefined;
	countryCode?: string | undefined;
}

export function ProfileView({ personaName, realName, countryCode, avatarSrc, profileUrl }: ProfileViewProps): ReactElement {
	return (
		<Box padding={4} borderWidth={1} borderRadius="md" maxWidth="600px">
			<Flex alignItems="center" gap={4}>
				<Image src={avatarSrc} alt={`${personaName}'s avatar`} boxSize="150px" borderRadius="full" />
				<Box>
					<Text fontWeight="bold">Usuário: {personaName}</Text>
					<Text>Nome: {realName ?? '-'}</Text>
					<Text>País: {countryCode ?? '-'}</Text>
					<Text>
						Link do perfil:{' '}
						<Link href={profileUrl} color="blue.500">
							{profileUrl}
						</Link>
					</Text>
				</Box>
			</Flex>
		</Box>
	);
}
