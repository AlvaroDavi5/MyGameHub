import { useReducer, useState, type ReactElement } from 'react';
import { useFetcher } from 'react-router';
import { Box, Button, Flex, Image, Input, Link, Text } from '@chakra-ui/react';
import type { Route } from './+types/profile-search';
import { searchInputReducer } from './reducer';
import { SteamApiClient } from '../../lib/api/steam-api';

export async function action({ request }: Route.ActionArgs) {
	const steamClient = new SteamApiClient();
	const formData = await request.formData();
	const username = String(formData.get('username') ?? '').trim();

	try {
		let steamId = username;

		const isUsernameSteamId = /^\d+$/.test(username);
		if (!isUsernameSteamId) {
			const steamIdRes = await steamClient.getSteamIdByUsername(username);
			if ('error' in steamIdRes) {
				return { error: steamIdRes.error };
			}
			steamId = steamIdRes.data.steamId;
		}

		const playerRes = await steamClient.getPlayerStatsBySteamId(steamId);
		if ('error' in playerRes) {
			return { error: playerRes.error };
		}
		return { data: playerRes.data };
	} catch (error) {
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: 'Ocorreu um erro desconhecido ao pesquisar o perfil' };
	}
}

export function meta(_args: Route.MetaArgs) {
	return [{ title: 'Busca de Perfis' }];
}

export default function ProfileSearch() {
	const [searchInputState, dispatchSearchInputState] = useReducer(searchInputReducer, {
		inputUsername: '',
		isButtonDisabled: true,
	});
	const [lastSearchedUsername, setLastSearchedUsername] = useState<string | null>(null);
	const fetcher = useFetcher<typeof action>();

	const isSearching = fetcher.state !== 'idle';
	const result = fetcher.data;

	const changeInputUsername = (inputValue: string): void => {
		const trimmedValue = inputValue.trim();
		const wasChanged = !!trimmedValue && trimmedValue !== lastSearchedUsername?.trim();
		dispatchSearchInputState({ type: 'SET_INPUT_USERNAME', value: inputValue });
		dispatchSearchInputState({ type: 'SET_BUTTON_DISABLED', value: String(!wasChanged) });
	};
	const submitSearch = (): void => {
		setLastSearchedUsername(searchInputState.inputUsername);
		dispatchSearchInputState({ type: 'SET_BUTTON_DISABLED', value: 'true' });
		fetcher.submit({ username: searchInputState.inputUsername }, { method: 'post' });
	};

	return (
		<>
			<Flex
				aria-label="input-element"
				direction={['column', 'row']}
				alignItems={['flex-start', 'center']}
				justifyContent={['flex-start', 'center']}
				gap={[2, 4]}
				padding={4}
			>
				<Input
					value={searchInputState.inputUsername}
					onChange={(e) => changeInputUsername(e.target.value)}
					placeholder="Digite o username ou SteamID"
					width={['100%', '600px']}
				/>
				<Button onClick={submitSearch} disabled={searchInputState.isButtonDisabled || isSearching}>
					Pesquisar
				</Button>
			</Flex>

			<Box padding={4}>
				{isSearching && <Text>Pesquisando...</Text>}
				{!isSearching && result && 'error' in result && <Text color="red.500">{result.error}</Text>}
				{!isSearching && result && 'data' in result && result.data && (
					<ProfileView
						personaName={result.data.personaname}
						realName={result.data.realname}
						profileUrl={result.data.profileurl}
						imgSrc={result.data.avatarfull}
						countryCode={result.data.loccountrycode}
					/>
				)}
			</Box>
		</>
	);
}

interface ProfileViewProps {
	personaName: string;
	profileUrl: string;
	imgSrc: string;
	realName?: string | undefined;
	countryCode?: string | undefined;
}

function ProfileView(props: ProfileViewProps): ReactElement {
	return (
		<Box padding={4} borderWidth={1} borderRadius="md" maxWidth="600px">
			<Flex alignItems="center" gap={4}>
				<Image src={props.imgSrc} alt={`${props.personaName}'s avatar`} boxSize="64px" borderRadius="full" />
				<Box>
					<Text fontWeight="bold">Usuário: {props.personaName}</Text>
					<Text>Nome: {props.realName ?? '-'}</Text>
					<Text>País: {props.countryCode ?? '-'}</Text>
					<Text>
						Link do perfil:{' '}
						<Link href={props.profileUrl} color="blue.500">
							{props.profileUrl}
						</Link>
					</Text>
				</Box>
			</Flex>
		</Box>
	);
}
