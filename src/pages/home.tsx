import { useEffect, type ReactElement } from 'react';
import { Flex } from '@chakra-ui/react';
import { FeatureCard } from '@components/cards/feature-card';
import { SearchForm } from '@components/forms/search-form';
import gameSearchImg from '@assets/cards/game-search.jpg';
import myGamesImg from '@assets/cards/my-games.jpg';
import profileSearchImg from '@assets/cards/profile-search.png';
import { siteConfig } from '@configs/site';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectSteamId } from '@store/steam-user.selectors';
import { clearSteamId, setSteamId } from '@store/steam-user.slice';
import { useProfileSearch } from './profile-search/hooks/use-profile-search';
import type { Route } from './+types/home';

export { profileSearchAction as action } from './profile-search/profile-search.action';

export function meta(_args: Route.MetaArgs) {
	return [{ title: `Homepage - ${siteConfig.title}` }, { name: 'description', content: 'Central de busca de jogos e perfis de jogadores.' }];
}

export default function Home(): ReactElement {
	const dispatch = useAppDispatch();
	const steamId = useAppSelector(selectSteamId);
	const { isSearching, result, search } = useProfileSearch();

	useEffect(() => {
		if (result && 'data' in result && result.data) {
			dispatch(setSteamId(result.data.steamId));
		}
		if (result && 'error' in result) {
			dispatch(clearSteamId());
		}
	}, [result, dispatch]);

	const hasSteamUser = steamId !== null;
	const disableCards = Boolean(!hasSteamUser || isSearching);

	return (
		<Flex direction="column" align="center" gap={8} padding={8} minH="calc(100vh - 72px)">
			<SearchForm isSearching={isSearching} onSearch={search} placeholder="Digite seu username ou SteamID" />

			<Flex wrap="wrap" justify="center" align="center" gap={8}>
				<FeatureCard to="/profile-search" imgSrc={profileSearchImg} imgAlt="Pesquisar usuários" disabled={disableCards}>
					Pesquisar Usuários
				</FeatureCard>
				<FeatureCard to="/game-search" imgSrc={gameSearchImg} imgAlt="Pesquisar jogos" disabled={disableCards}>
					Pesquisar Jogos
				</FeatureCard>
				<FeatureCard to="/my-games" imgSrc={myGamesImg} imgAlt="Consultar meus jogos" disabled={disableCards}>
					Consultar Meus Jogos
				</FeatureCard>
			</Flex>
		</Flex>
	);
}
