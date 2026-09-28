import type { ReactElement } from 'react';
import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

interface ProfileViewProps {
	personaName: string;
	profileUrl: string;
	avatarSrc: string;
	lastLogoffTimestamp: number;
	gamesCount: number;
	badgesCount: number;
	accountLevel: number;
	realName?: string | undefined;
	countryCode?: string | undefined;
}

export function ProfileView({
	personaName,
	realName,
	countryCode,
	avatarSrc,
	profileUrl,
	lastLogoffTimestamp,
	gamesCount,
	badgesCount,
	accountLevel,
}: ProfileViewProps): ReactElement {
	const lastOnlineAt = new Date(lastLogoffTimestamp * 1000).toLocaleString('pt-BR');

	return (
		<Box padding={8} borderWidth={1} borderRadius="lg" maxWidth="800px" width="full">
			<Flex alignItems="center" gap={8} wrap="wrap">
				<Image src={avatarSrc} alt={`${personaName}'s avatar`} boxSize="150px" borderRadius="full" />
				<Box>
					<Text fontSize="2xl" fontWeight="bold">
						{personaName}
					</Text>
					<Text fontSize="lg">Nome: {realName ?? '-'}</Text>
					<Text fontSize="lg">País: {countryCode ?? '-'}</Text>
					<Text fontSize="lg">Nível da conta: {accountLevel}</Text>
					<Text fontSize="lg">Insígnias: {badgesCount}</Text>
					<Text fontSize="lg">Jogos que possui: {gamesCount}</Text>
					<Text fontSize="lg">Última vez online: {lastOnlineAt}</Text>
					<Text fontSize="lg">
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
